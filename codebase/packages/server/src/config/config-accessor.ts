// @ts-ignore
import yn from 'yn';
import { getAppEnv } from '@pma-common/connector-utils';
import { ApiEnv } from '@energon-connectors/core';

import { getEnv } from './env-accessor';
import { defaultConfig } from './default';
import path from 'path';

export type ProcessConfig = {
  // general
  buildEnvironment: () => string;
  runtimeEnvironment: () => string;
  environment: () => keyof typeof NodeJS.Environment;
  apiEnv: () => ApiEnv;
  port: () => number;
  //
  loggerRootName: () => string;
  loggerLevel: () => keyof typeof NodeJS.LogLevel;
  loggerPretify: () => boolean;
  loggerThemeName: () => string;
  loggerLogAuthToken: () => boolean;
  //
  apiServerUrl: () => URL;
  apiIdentityServerUrl: () => URL | undefined;
  apiManagementServerUrl: () => URL | undefined;
  swaggerServerUrl: () => URL | undefined;
  camundaServerUrl: () => URL | undefined;
  authPath: () => string;
  // integration
  integrationMode: () => keyof typeof NodeJS.AppMode;
  integrationCoreMountPath: () => string;
  integrationCoreMountUrl: () => string;
  integrationMountPath: () => string;
  integrationNodeBFFUrl: () => string;
  integrationBuildPath: () => string;
  integrationMFModule: () => string;
  integrationSSOLogoutPath: () => string;
  integrationUIMountPath: () => string;
  // application specific settings
  applicationName: () => string;
  applicationUrl: () => URL;
  applicationOrigin: () => string;
  applicationContextPath: () => string;
  // applicationServerUrlRoot: () => string;
  // applicationPublicUrl: () => string;
  // cookies settings
  applicationIdTokenCookieName: () => string | undefined;
  applicationSessionCookieName: () => string | undefined;
  applicationCookieParserSecret: () => string;
  applicationUserDataCookieName: () => string;
  applicationUserDataCookieSecret: () => string | undefined;
  stickCookiesToApplicationPath: () => boolean;
  // authToken check
  useRequireIdentityToken: () => boolean;
  // onelogin
  useOneLogin: () => boolean;
  oidcIssuerUrl: () => string;
  oidcClientId: () => string;
  oidcClientSecret: () => string;
  oidcRefreshTokenSecret: () => string;
  // roles group assigments
  oidcAuthCallbackPath: () => string;
  oidcRedirectAfterLogoutPath: () => string;
  // identity
  identityClientId: () => string;
  identityClientSecret: () => string;
  identityUserScopedTokenCookieName: () => string;
  identityUserScopedTokenCookieSecret: () => string;
};

export class ConfigAccessor {
  private static instance: ConfigAccessor;
  private readonly config: ProcessConfig;

  private constructor(processEnv: NodeJS.ProcessEnv) {
    // const applicationServerUrlRoot = processEnv.APPLICATION_SERVER_URL_ROOT;
    const port = isNaN(Number(processEnv.NODE_PORT)) ? defaultConfig.port : Number(processEnv.NODE_PORT);

    this.config = {
      // general
      buildEnvironment: () => processEnv.BUILD_ENV || defaultConfig.defaultEnvironment,
      runtimeEnvironment: () => processEnv.RUNTIME_ENV,
      environment: () => processEnv.NODE_ENV,
      apiEnv: () => getAppEnv(this.config.runtimeEnvironment(), undefined),
      port: () => port,
      //
      loggerRootName: () => processEnv.LOGGER_ROOT_NAME || defaultConfig.loggerRootName,
      loggerLevel: () => processEnv.LOGGER_LEVEL || defaultConfig.loggerDefaultLevel,
      loggerPretify: () => yn(processEnv.LOGGER_PRETIFY, { default: false }),
      loggerThemeName: () => processEnv.LOGGER_THEME || defaultConfig.loggerDefaultTheme,
      loggerLogAuthToken: () => yn(processEnv.LOGGER_LOG_AUTHTOKEN, { default: false }),
      //
      apiServerUrl: () =>
        createUrlOrFail(
          processEnv.API_SERVER_URL,
          `API_SERVER_URL must be a well-formed URL pointing to API server, e.g.: http://tesco.com/pma/api`,
          { removeTrailingSlash: true },
        ),
      //
      apiIdentityServerUrl: () =>
        createUrlOrUndefined(
          processEnv.API_IAM_SERVER_URL,
          `API_IAM_SERVER_URL must be a well-formed URL pointing to identity API server, e.g.: http://tesco.com:8080/pma/iam-api`,
          { removeTrailingSlash: true },
        ),
      //
      apiManagementServerUrl: () =>
        createUrlOrUndefined(
          processEnv.API_MANAGEMENT_SERVER_URL,
          `API_MANAGEMENT_SERVER_URL must be a well-formed URL pointing to actuator server, e.g.: http://tesco.com:8080/pma/actuator`,
          { removeTrailingSlash: true },
        ),
      //
      swaggerServerUrl: () =>
        createUrlOrUndefined(
          processEnv.SWAGGER_SERVER_URL,
          `SWAGGER_SERVER_URL must be a well-formed URL pointing to API server, e.g.: http://tesco.com/pma/api-docs`,
          { removeTrailingSlash: true },
        ),
      //
      camundaServerUrl: () =>
        createUrlOrUndefined(
          processEnv.CAMUNDA_SERVER_URL,
          `CAMUNDA_SERVER_URL must be a well-formed URL pointing to API server, e.g.: http://tesco.com/pma/camunda`,
          { removeTrailingSlash: true },
        ),
      authPath: () => defaultConfig.authPath,
      // integration
      integrationMode: () => processEnv.INTEGRATION_MODE,
      integrationCoreMountPath: () => processEnv.INTEGRATION_CORE_MOUNT_PATH,
      integrationCoreMountUrl: () =>
        path.join(
          processEnv.INTEGRATION_CORE_URL,
          processEnv.INTEGRATION_CORE_MOUNT_PATH,
          processEnv.INTEGRATION_MOUNT_PATH,
        ),
      integrationMountPath: () => processEnv.INTEGRATION_MOUNT_PATH,
      integrationNodeBFFUrl: () => `${processEnv.INTEGRATION_NODE_BFF_URL}:${port}${processEnv.INTEGRATION_MOUNT_PATH}`,
      integrationBuildPath: () => defaultConfig.buildPath,
      integrationMFModule: () => defaultConfig.mfModule,
      integrationSSOLogoutPath: () =>
        path.join(processEnv.INTEGRATION_CORE_URL, processEnv.INTEGRATION_CORE_MOUNT_PATH, defaultConfig.SSOLogoutPath),
      integrationUIMountPath: () =>
        path.join(processEnv.INTEGRATION_CORE_MOUNT_PATH, processEnv.INTEGRATION_MOUNT_PATH),
      // application specific settings
      applicationName: () => processEnv.APPLICATION_NAME || defaultConfig.applicationName,
      applicationUrl: () =>
        createUrlOrFail(
          processEnv.APPLICATION_URL,
          `APPLICATION_URL must be a well-formed URL pointing to the root of application, e.g.: http://tesco.com/pma`,
          { removeTrailingSlash: true },
        ),
      applicationOrigin: () => {
        const applicationUrl = this.config.applicationUrl();
        return `${applicationUrl.origin}`;
      },
      applicationContextPath: () => this.config.applicationUrl().pathname,
      // cookies settings
      applicationIdTokenCookieName: () => processEnv.APPLICATION_AUTH_TOKEN_COOKIE_NAME || undefined,
      applicationSessionCookieName: () => processEnv.APPLICATION_SESSION_COOKIE_NAME || undefined,
      applicationCookieParserSecret: () =>
        processEnv.APPLICATION_COOKIE_PARSER_SECRET || defaultConfig.applicationCookieParserSecret,
      applicationUserDataCookieName: () =>
        processEnv.APPLICATION_USER_DATA_COOKIE_NAME || defaultConfig.applicationUserDataCookieName,
      applicationUserDataCookieSecret: () => processEnv.APPLICATION_USER_DATA_COOKIE_SECRET,
      stickCookiesToApplicationPath: () => yn(processEnv.STICK_COOKIES_TO_APPLICATION_PATH, { default: false }),
      // use sso
      useOneLogin: () => yn(processEnv.USE_ONELOGIN, { default: false }),
      useRequireIdentityToken: () => yn(processEnv.USE_REQUIRE_IDENTITY_TOKEN, { default: true }),
      // onelogin
      oidcIssuerUrl: () => processEnv.OIDC_ISSUER_URL,
      oidcClientId: () => processEnv.OIDC_CLIENT_ID,
      oidcClientSecret: () => processEnv.OIDC_CLIENT_SECRET,
      oidcRefreshTokenSecret: () => processEnv.OIDC_REFRESH_TOKEN_SECRET,
      oidcRedirectAfterLogoutPath: () =>
        processEnv.OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH || defaultConfig.oidcRedirectAfterLogoutPath,
      // roles group assigments
      oidcAuthCallbackPath: () => processEnv.OIDC_AUTH_CALLBACK_PATH || defaultConfig.oidcAuthCallbackPath,
      // identity
      identityClientId: () => processEnv.IDENTITY_CLIENT_ID,
      identityClientSecret: () => processEnv.IDENTITY_CLIENT_SECRET,
      identityUserScopedTokenCookieName: () => processEnv.IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      identityUserScopedTokenCookieSecret: () => processEnv.IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
    };
  }

  static getInstance(processEnv: NodeJS.ProcessEnv): ConfigAccessor {
    if (!this.instance) {
      this.instance = new this(processEnv);
    }

    return this.instance;
  }

  public getConfig(): ProcessConfig {
    return this.config;
  }
}

const createUrlOrFail = (
  urlString: string,
  errorMessage: string,
  options: { removeTrailingSlash?: boolean; addTrailngSlash?: boolean } = { removeTrailingSlash: true },
) => {
  try {
    if (options?.removeTrailingSlash === true && urlString.endsWith('/') === true) {
      urlString = urlString.slice(0, -1);
    }
    if (options?.addTrailngSlash === true && urlString.endsWith('/') === false) {
      urlString = urlString + '/';
    }
    return new URL(urlString);
  } catch {
    throw new Error(errorMessage);
  }
};

const createUrlOrUndefined = (
  urlString: string,
  errorMessage: string,
  options: { removeTrailingSlash?: boolean; addTrailngSlash?: boolean } = { removeTrailingSlash: true },
) => {
  if (urlString === undefined) return undefined;
  return createUrlOrFail(urlString, errorMessage, options);
};

export const prettify = (config: ProcessConfig): void => {
  console.table(
    Object.keys(config).reduce((acc, key) => {
      const value = config[key]();
      return { ...acc, [key]: Array.isArray(value) ? value.join(', ') : value ? value.toString() : '-- not set --' };
    }, {}),
  );
};

export const getConfig = () => {
  // validate if all required process env variables exist
  getEnv().validate();
  return ConfigAccessor.getInstance(getEnv().getVariables()).getConfig();
};
