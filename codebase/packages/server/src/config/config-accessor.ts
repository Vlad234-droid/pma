// @ts-ignore
import yn from 'yn';
import { getAppEnv } from '@pma-common/connector-utils';
import { ApiEnv } from '@energon-connectors/core';

import { getEnv } from './env-accessor';
import { defaultConfig } from './default';
import { isUrlAbsolute } from '../utils';

export type ProcessConfig = {
  // general
  buildEnvironment: () => string;
  runtimeEnvironment: () => string;
  environment: () => keyof typeof NodeJS.Environment;
  apiEnv: () => ApiEnv;
  port: () => number;
  loggerRootName: () => string;
  loggerLevel: () => string | undefined;
  loggerPretify: () => boolean | undefined;
  proxyApiServerUrl: () => string;
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
  applicationServerUrlRoot: () => string;
  applicationName: () => string;
  applicationPublicUrl: () => string;
  applicationUrlRoot: () => string;
  applicationUrlRootWithApplicationPublicUrl: () => string;
  // cookies settings
  applicationIdTokenCookieName: () => string | undefined;
  applicationSessionCookieName: () => string | undefined;
  applicationCookieParserSecret: () => string;
  applicationUserDataCookieName: () => string;
  applicationUserDataCookieSecret: () => string | undefined;
  stickCookiesToApplicationPath: () => boolean;
  // onelogin
  useOneLogin: () => boolean;
  oneLoginIssuerUrl: () => string;
  oneLoginApplicationPath: () => string;
  oneLoginCallbackUrlRoot: () => string;
  oneLoginCallbackPath: () => string;
  oneLoginRedirectAfterLogoutUrl: () => string;
  oidcClientId: () => string;
  oidcClientSecret: () => string;
  oidcRefreshTokenSecret: () => string;
  // roles group assigments
  oidcGroupFiltersRegex: () => RegExp[];
  oidcAdminGroups: () => string[];
  oidcAuthCallbackPath: () => string;
  oidcManagerGroups: () => string[];
  oidcRedirectAfterLogoutPath: () => string;
  oidcViewerGroups: () => string[];
  defaultRoles: () => string[];
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
    const applicationServerUrlRoot = processEnv.APPLICATION_SERVER_URL_ROOT;
    const port = isNaN(Number(processEnv.NODE_PORT)) ? defaultConfig.port : Number(processEnv.NODE_PORT);
    const coreMountPath = processEnv.INTEGRATION_CORE_MOUNT_PATH;
    const applicationPublicUrl = processEnv.APPLICATION_PUBLIC_URL === '/' ? '' : processEnv.APPLICATION_PUBLIC_URL;
    const oneLoginApplicationPath = applicationPublicUrl;
    const applicationUrlRoot = processEnv.APPLICATION_URL_ROOT;
    const oneLoginRedirectAfterLogoutUrl =
      processEnv.ONELOGIN_REDIRECT_AFTER_LOGOUT_URL || defaultConfig.oidcRedirectAfterLogoutPath;
    this.config = {
      // general
      buildEnvironment: () => processEnv.BUILD_ENV,
      runtimeEnvironment: () => processEnv.RUNTIME_ENV,
      environment: () => processEnv.NODE_ENV,
      apiEnv: () => getAppEnv(this.config.runtimeEnvironment(), undefined),
      port: () => port,
      loggerRootName: () => processEnv.LOGGER_ROOT_NAME || defaultConfig.loggerRootName,
      loggerLevel: () => processEnv.LOGGER_LEVEL,
      loggerPretify: () => (processEnv.LOGGER_PRETIFY ? yn(processEnv.LOGGER_PRETIFY, { default: false }) : undefined),
      proxyApiServerUrl: () => processEnv.PROXY_API_SERVER_URL,
      authPath: () => defaultConfig.authPath,
      // integration
      integrationMode: () => processEnv.INTEGRATION_MODE,
      integrationCoreMountPath: () => coreMountPath,
      integrationCoreMountUrl: () =>
        coreMountPath === '/'
          ? `${processEnv.INTEGRATION_CORE_URL}${processEnv.INTEGRATION_MOUNT_PATH}`
          : `${processEnv.INTEGRATION_CORE_URL}${coreMountPath}${processEnv.INTEGRATION_MOUNT_PATH}`,
      integrationMountPath: () => processEnv.INTEGRATION_MOUNT_PATH,
      integrationNodeBFFUrl: () => `${processEnv.INTEGRATION_NODE_BFF_URL}:${port}${processEnv.INTEGRATION_MOUNT_PATH}`,
      integrationBuildPath: () => defaultConfig.buildPath,
      integrationMFModule: () => defaultConfig.mfModule,
      integrationSSOLogoutPath: () =>
        coreMountPath === '/'
          ? `${processEnv.INTEGRATION_CORE_URL}${defaultConfig.SSOLogoutPath}`
          : `${processEnv.INTEGRATION_CORE_URL}${coreMountPath}${defaultConfig.SSOLogoutPath}`,
      integrationUIMountPath: () =>
        coreMountPath === '/'
          ? processEnv.INTEGRATION_MOUNT_PATH
          : `${coreMountPath}${processEnv.INTEGRATION_MOUNT_PATH}`,
      // application specific settings
      applicationServerUrlRoot: () => applicationServerUrlRoot,
      applicationName: () => defaultConfig.applicationName,
      applicationPublicUrl: () => processEnv.APPLICATION_PUBLIC_URL,
      applicationUrlRoot: () => applicationUrlRoot,
      applicationUrlRootWithApplicationPublicUrl: () => `${applicationUrlRoot}${applicationPublicUrl}`,
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
      // onelogin
      oneLoginIssuerUrl: () => processEnv.ONELOGIN_ISSUER_URL,
      oneLoginApplicationPath: () => oneLoginApplicationPath,
      oneLoginCallbackUrlRoot: () => processEnv.APPLICATION_URL_ROOT,
      oneLoginCallbackPath: () => processEnv.ONELOGIN_CALLBACK_PATH,
      oneLoginRedirectAfterLogoutUrl: () =>
        isUrlAbsolute(oneLoginRedirectAfterLogoutUrl)
          ? oneLoginRedirectAfterLogoutUrl
          : `${oneLoginApplicationPath}${oneLoginRedirectAfterLogoutUrl}`,
      oidcClientId: () => processEnv.OIDC_CLIENT_ID,
      oidcClientSecret: () => processEnv.OIDC_CLIENT_SECRET,
      oidcRefreshTokenSecret: () => processEnv.OIDC_REFRESH_TOKEN_SECRET,
      oidcRedirectAfterLogoutPath: () =>
        processEnv.OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH || defaultConfig.oidcRedirectAfterLogoutPath,
      // roles group assigments
      oidcGroupFiltersRegex: () => defaultConfig.oidcGroupFiltersRegex,
      oidcAdminGroups: () => (processEnv.OIDC_GROUPS_ADMIN_ROLE ? processEnv.OIDC_GROUPS_ADMIN_ROLE.split(/[,;]/) : []),
      oidcAuthCallbackPath: () => processEnv.OIDC_AUTH_CALLBACK_PATH || defaultConfig.oidcAuthCallbackPath,
      oidcManagerGroups: () =>
        processEnv.OIDC_GROUPS_MANAGER_ROLE ? processEnv.OIDC_GROUPS_MANAGER_ROLE.split(/[,;]/) : [],
      oidcViewerGroups: () =>
        processEnv.OIDC_GROUPS_VIEWER_ROLE ? processEnv.OIDC_GROUPS_VIEWER_ROLE.split(/[,;]/) : [],
      defaultRoles: () => [defaultConfig.defaultRole],
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

export const prettify = (config: ProcessConfig): void => {
  console.table(
    Object.keys(config).reduce((acc, key) => {
      const value = config[key]();
      return { ...acc, [key]: Array.isArray(value) ? value.join(', ') : value };
    }, {}),
  );
};

export const getConfig = () => {
  // validate if all required process env variables exist
  getEnv().validate();

  return ConfigAccessor.getInstance(getEnv().getVariables()).getConfig();
};
