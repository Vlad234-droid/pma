import express, { Router } from 'express';
import path from 'path';
import os from 'os';
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

if (isLocal(config.buildEnvironment())) {
  prettify(config);
}

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

const NODE_PORT = config.port();
const API_SERVER_URL = config.apiServerUrl();

if (!API_SERVER_URL) {
  console.error(`Required property is not set: API_SERVER_URL. Server halted.`);
  exit(-1);
}

(async () => {
  try {
    const app = express();

    const router = Router();

    const buildPath = config.integrationBuildPath();
    const integrationMode = config.integrationMode();
    const mfModule = config.integrationMFModule();

    const clientDistFolder = getPackageDistFolder('@pma/client', buildPath);
    const htmlFilePath = path.join(clientDistFolder, 'index.html');
    const mfModulePath = path.join(clientDistFolder, mfModule);

    const nodeBFFUrl = config.integrationNodeBFFUrl();
    const mountPath = config.integrationMountPath();
    const uiMountPath = config.integrationUIMountPath();

    router.use(
      cors({
        credentials: true,
        origin: config.applicationRoot(),
      }),
    );

    // setup logger middlewares
    router.use(getHttpLoggerMiddleware('http'));

    if (isDEV(config.buildEnvironment()) || !config.useOneLogin()) {
      console.log(`WARNING! Authentication is turned off. Fake Login is used.`);
      // fake login behavior
      router.use(cookieParser(config.applicationCookieParserSecret()));
      // TODO: specify default user with default role that api server recognize
    } else {
      switch (integrationMode) {
        case 'integrity': {
          router.use(authMiddleware(config));
          break;
        }
        case 'standalone': {
          const openIdMiddleware = await initializeOpenid(config);
          router.use(openIdMiddleware);
          break;
        }
      }
    }

    router.use(express.static(clientDistFolder, { index: false }));
    router.use(express.static('public'));

    router.use('/api', apiProxyMiddleware(config));
    router.use('/camunda', camundaProxyMiddleware(config));

    router.use('/_status', (_, res) => res.sendStatus(200));

    const myInboxMiddleware = await myInboxConfig(config);
    myInboxMiddleware && router.use(myInboxMiddleware);

    // static file serving sectionmy
    switch (integrationMode) {
      case 'integrity': {
        router.use(
          `/${mfModule}`,
          mfModuleAssetHandler({
            pathToFile: mfModulePath,
            config: {
              nodeBFFUrl,
              mountPath: uiMountPath,
            },
          }),
        );

        app.use(mountPath, router);
        break;
      }
      case 'standalone': {
        router.use(
          standaloneIndexAssetHandler({
            pathToFile: htmlFilePath,
            config: {
              nodeBFFUrl,
              mountPath: uiMountPath,
            },
          }),
        );

        app.use(uiMountPath, router);
        break;
      }
    }

    app.use(
      errorHandler({
        appName: config.applicationName(),
        logoutPath: config.integrationSSOLogoutPath(),
        tryAgainPath: config.integrationCoreMountUrl(),
      }),
    );

    app.disable('x-powered-by');

    const server = app.listen(NODE_PORT, () => {
      logger.info(`Server is running at http://${os.hostname().toLowerCase()}:${NODE_PORT}`);
    });

    process.on('SIGHUP', () => server.close());
    process.on('SIGINT', () => server.close());
    process.on('SIGTERM', () => server.close());

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
