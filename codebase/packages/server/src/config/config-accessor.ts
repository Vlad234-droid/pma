// @ts-ignore
import yn from 'yn';

import { getEnv } from './env-accessor';
import { defaultConfig } from './default';

export type ProcessConfig = {
  // general
  buildEnvironment: () => string;
  environment: () => string;
  port: () => number;
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
  applicationName: () => string;
  applicationPublicUrl: () => string;
  applicationUrlRoot: () => string;
  // cookies settings
  applicationCookieParserSecret: () => string;
  applicationUserDataCookieName: () => string;
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
  oidcManagerGroups: () => string[];
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
    const port = isNaN(Number(processEnv.NODE_PORT)) ? defaultConfig.port : Number(processEnv.NODE_PORT);
    const coreMountPath = processEnv.INTEGRATION_CORE_MOUNT_PATH;
    const oneLoginApplicationPath = processEnv.APPLICATION_PUBLIC_URL === '/' ? '' : processEnv.APPLICATION_PUBLIC_URL;
    const oneLoginRedirectAfterLogoutUrl =
      processEnv.ONELOGIN_REDIRECT_AFTER_LOGOUT_URL || defaultConfig.oidcRedirectAfterLogoutPath;
    this.config = {
      // general
      buildEnvironment: () => processEnv.BUILD_ENV,
      environment: () => processEnv.NODE_ENV,
      port: () => port,
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
      applicationName: () => defaultConfig.applicationName,
      applicationPublicUrl: () => processEnv.APPLICATION_PUBLIC_URL,
      applicationUrlRoot: () => processEnv.APPLICATION_URL_ROOT,
      // cookies settings
      applicationCookieParserSecret: () =>
        processEnv.APPLICATION_COOKIE_PARSER_SECRET || defaultConfig.applicationCookieParserSecret,
      applicationUserDataCookieName: () =>
        processEnv.APPLICATION_USER_DATA_COOKIE_NAME || defaultConfig.applicationUserDataCookieName,
      // use sso
      useOneLogin: () => yn(processEnv.USE_ONELOGIN, { default: false }),
      // onelogin
      oneLoginIssuerUrl: () => processEnv.ONELOGIN_ISSUER_URL,
      oneLoginApplicationPath: () => oneLoginApplicationPath,
      oneLoginCallbackUrlRoot: () => processEnv.APPLICATION_URL_ROOT,
      oneLoginCallbackPath: () => processEnv.ONELOGIN_CALLBACK_PATH,
      oneLoginRedirectAfterLogoutUrl: () => `${oneLoginApplicationPath}${oneLoginRedirectAfterLogoutUrl}`,
      oidcClientId: () => processEnv.OIDC_CLIENT_ID,
      oidcClientSecret: () => processEnv.OIDC_CLIENT_SECRET,
      oidcRefreshTokenSecret: () => processEnv.OIDC_REFRESH_TOKEN_SECRET,
      // roles group assigments
      oidcGroupFiltersRegex: () => defaultConfig.oidcGroupFiltersRegex,
      oidcAdminGroups: () => (processEnv.OIDC_GROUPS_ADMIN_ROLE ? processEnv.OIDC_GROUPS_ADMIN_ROLE.split(/[,;]/) : []),
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
