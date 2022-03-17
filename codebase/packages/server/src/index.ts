import express, { Response, Router } from 'express';
import path from 'path';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getIdentityData, withReturnTo } from '@energon/onelogin';
// utils
import { getPackageDistFolder } from './utils/package';
import { exit } from 'process';
// config
import { getConfig, getEnv, isDEV, isLocal, prettify, isPROD, isPPE } from './config';
// middlewares
import {
  authMiddleware,
  errorHandler,
  mfModuleAssetHandler,
  initializeOpenid,
  standaloneIndexAssetHandler,
  myInboxConfig,
} from './middlewares';

import { initialize as initializeLogger, getHttpLoggerMiddleware } from '@pma-common/logger';

getEnv().validate();
const config = getConfig();

let logPretify = config.loggerPretify();
if (logPretify === undefined) {
  logPretify = !!config.buildEnvironment() && isLocal(config.buildEnvironment());
}

const logLevel =
  config.loggerLevel() ||
  (isPROD(config.runtimeEnvironment()) || isPPE(config.runtimeEnvironment()) ? 'info' : logPretify ? 'trace' : 'debug');

const logger = initializeLogger(config.loggerRootName(), logLevel, logPretify);

logger.info(`Current build environment: ${config.buildEnvironment()}`);
logger.info(`Current infrastructure environment: ${config.runtimeEnvironment()}`);

if (isLocal(config.buildEnvironment())) {
  prettify(config);
}

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
      pathRewrite: { ['^/api']: '' },
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

    // setup logger middlewares
    appServer.use(getHttpLoggerMiddleware('http'));

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
          const openIdMiddleware = await initializeOpenid(config);

          appServer.use(openIdMiddleware);

          break;
        }
      }

      proxyMiddlewareOptions.onProxyReq = function (proxyReq, req, res) {
        const identityData = getIdentityData(res as Response);

        console.log('[HPM] Clear all cookies');
        proxyReq.setHeader('Cookie', '');

        proxyReq.setHeader('Authorization', `Bearer ${identityData?.access_token}`);

        if (isLocal(config.buildEnvironment())) {
          console.log('[HPM] Authorization: bearer-jwt-identity', identityData?.access_token);
        }
      };
    }

    appServer.use(express.static(clientDistFolder, { index: false }));
    appServer.use(express.static('public'));

    const proxyMiddleware = createProxyMiddleware(
      ['/api/**', '!/api/colleague-inbox/**', '!/api/manager-bff/**'],
      proxyMiddlewareOptions,
    );
    appServer.use('/api', proxyMiddleware);
    appServer.use('/_status', (_, res) => res.sendStatus(200));

    const myInboxMiddleware = await myInboxConfig(config);
    myInboxMiddleware && appServer.use(myInboxMiddleware);

    // static file serving sectionmy
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

    if (isLocal(config.buildEnvironment())) {
      prettify(config);
    }

    server.listen(NODE_PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${NODE_PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
