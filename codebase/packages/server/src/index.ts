import express, {  Router } from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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
  apiProxyMiddleware,
  camundaProxyMiddleware,
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
  console.error(`Required property is not set: PROXY_API_SERVER_URL. Server halted.`);
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

    appServer.use(
      cors({
        credentials: true,
        origin: config.applicationServerUrlRoot(),
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
    }

    appServer.use(express.static(clientDistFolder, { index: false }));
    appServer.use(express.static('public'));

    appServer.use('/api', apiProxyMiddleware(config));
    appServer.use('/camunda', camundaProxyMiddleware(config));
    
    appServer.use('/_status', (_, res) => res.sendStatus(200));

    server.use(
      errorHandler({
        appName: config.applicationName(),
        logoutPath: config.integrationSSOLogoutPath(),
        tryAgainPath: config.integrationCoreMountUrl(),
      }),
    );

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
