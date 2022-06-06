import bodyParser from "body-parser"
import cors from "cors"
import { Router } from "express"

import { emptyIfRoot } from "@pma-connectors/onelogin"
import { getLogger } from "@pma-common/logger"

import { initializeProxyMiddleware } from "../../middlewares/proxy"
import { getColleagueInboxApiConfig, LocalURL } from "./api-config"

// import { apiProxy, errorHandler, managerBffRouter } from "./middlewares"
// import { createLogSender } from "./utils"

export type MyInboxMiddlewareConfig = {
  /**
   * usually the process.env.NODE_CONFIG_ENV
   */
  configEnvironment: keyof typeof NodeJS.Environment;

  /**
   * 
   */
  logLevel?: keyof typeof NodeJS.LogLevel;

  /**
   * base domain
   */
  origin: string;

  /**
   * name of your app for use with error handling
   */
  // appName: string;

  /**
   * path where the application server is mounted and tokens are stored
   */
  contextPath: string;

  /**
   * path to the logout e.g. ${origin}/sso/logout
   */
  // logoutPath: string;

  /**
   * optional base path to your local mock server e.g. http://localhost:7100/mocks
   * this will only be used when the configEnvironment is set to "local"
   */
  localOrigin?: LocalURL;
}

export const myInboxMiddleware = async ({
  configEnvironment,
  logLevel,
  origin,
  contextPath,
  localOrigin,
}: MyInboxMiddlewareConfig): Promise<Router> => {

  const apiConfig = getColleagueInboxApiConfig(configEnvironment, localOrigin);

  try {
    const appRouter = Router();
    // appRouter.use(cookieParser());

    // wildcard origin is not allowed when sending cookies cross origins
    // should be set to core address
    appRouter.use(cors({ origin, credentials: true }));
    appRouter.use(bodyParser.urlencoded({ extended: true }));
    appRouter.use(bodyParser.json());

    // appRouter.use(
    //   errorHandler({
    //     appName: `${appName} - My inbox`,
    //     logoutPath,
    //     tryAgainPath: origin,
    //   }),
    // )

    appRouter.use(
      `${emptyIfRoot(contextPath)}/api/${apiConfig.name}`, 
      initializeProxyMiddleware({ 
        mountPath: `${emptyIfRoot(contextPath)}/api/${apiConfig.name}`,
        targetUrl: apiConfig.server,
        logLevel: logLevel || 'info', 
        logger: apiConfig.name,
      }),
    );

    return appRouter;
  } catch (error) {
    const logger = getLogger();
    logger.error({
      type: "bootstrap",
      configEnvironment,
      config: {
        api: apiConfig,
        origin,
      },
      error,
    }, "Error during MyInbox initialization");

    process.exit(1);
  }
}
