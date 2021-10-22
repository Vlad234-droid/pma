import express, { Response, Router } from 'express';
import path from 'path';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { withReturnTo, getIdentityData } from '@energon/onelogin';
// utils
import { getPackageDistFolder } from './utils/package';
import { exit } from 'process';
// config
import { getEnv, isDEV, getConfig, prettify } from './config';
// middlewares
import {
  authMiddleware,
  mfModuleAssetHandler,
  standaloneIndexAssetHandler,
  errorHandler,
  openIdConfig,
} from './middlewares';
import schema from './schema.json';

getEnv().validate();
const config = getConfig();

const NODE_PORT = config.port();
const PROXY_API_SERVER_URL = config.proxyApiServerUrl();

if (!PROXY_API_SERVER_URL) {
  console.error(`Required property is not set: API_SERVER_URL. Server halted.`);
  exit(-1);
}

(async () => {
  try {
    const server = express();

    const appServer = Router();

    const buildPath = config.integrationBuildPath();
    const integrationMode = config.integrationMode();
    const mfModule = config.integrationMFModule();

    const clientDistFolder = getPackageDistFolder('@pma/client', buildPath);
    const htmlFilePath = path.join(clientDistFolder, 'index.html');
    const mfModulePath = path.join(clientDistFolder, mfModule);

    const nodeBFFUrl = config.integrationNodeBFFUrl();
    const mountPath = config.integrationMountPath();
    const uiMountPath = config.integrationUIMountPath();

    if (!PROXY_API_SERVER_URL) {
      console.error(`Required property is not set: PROXY_API_SERVER_URL. Server halted.`);
      exit(-1);
    }

    const proxyMiddlewareOptions: Options = {
      target: PROXY_API_SERVER_URL,
      changeOrigin: true,
      autoRewrite: true,
      pathRewrite: { '^/api[0-9]?': '' },
      logLevel: 'debug',
    };
    proxyMiddlewareOptions.onError = function (e) {
      console.log('e', e);
    };

    appServer.use(
      cors({
        credentials: true,
        origin: config.applicationUrlRoot(),
      }),
    );

    if (isDEV(config.buildEnvironment()) || !config.useOneLogin()) {
      console.log(`WARNING! Authentication is turned off. Fake Login is used.`);
      // fake login behavior
      appServer.use(cookieParser(config.applicationCookieParserSecret()));
      // TODO: specify default user with default role that api server recognize
    } else {
      switch (integrationMode) {
        case 'integrity': {
          appServer.use(authMiddleware(config));
          break;
        }
        case 'standalone': {
          const { openId } = openIdConfig(config);

          appServer.use(
            withReturnTo(await openId, {
              isViewPath: (path) => !path.match('^(/api|/auth|/sso)'),
              appPath: config.oneLoginApplicationPath(),
            }),
          );

          break;
        }
      }

      proxyMiddlewareOptions.onProxyReq = function (proxyReq, _, res) {
        const identityData = getIdentityData(res as Response);

        console.log('Authorization: bearer-jwt-identity', identityData?.access_token);
        proxyReq.setHeader('Authorization', `Bearer ${identityData?.access_token}`);
      };
    }

    appServer.use(express.static(clientDistFolder, { index: false }));
    appServer.use(express.static('public'));

    const proxyMiddleware = createProxyMiddleware(proxyMiddlewareOptions);
    appServer.use('/api/v1/schema/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6', (_, res) => res.json(schema).sendStatus(200));
    appServer.use('/api', proxyMiddleware);
    appServer.use('/_status', (_, res) => res.sendStatus(200));

    console.log('version', process.version);

    // static file serving section
    switch (integrationMode) {
      case 'integrity': {
        appServer.use(
          `/${mfModule}`,
          mfModuleAssetHandler({
            pathToFile: mfModulePath,
            config: {
              nodeBFFUrl,
              mountPath: uiMountPath,
            },
          }),
        );

        server.use(mountPath, appServer);
        break;
      }
      case 'standalone': {
        appServer.use(
          standaloneIndexAssetHandler({
            pathToFile: htmlFilePath,
            config: {
              nodeBFFUrl,
              mountPath: uiMountPath,
            },
          }),
        );

        server.use(uiMountPath, appServer);
        break;
      }
    }

    appServer.use(
      errorHandler({
        appName: config.applicationName(),
        logoutPath: config.integrationSSOLogoutPath(),
        tryAgainPath: config.integrationCoreMountUrl(),
      }),
    );

    server.disable('x-powered-by');

    prettify(config);

    server.listen(NODE_PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${NODE_PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
