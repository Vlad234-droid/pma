const environmentParameters: Array<keyof NodeJS.ProcessEnv> = [
  'BUILD_ENV',
  'NODE_ENV',
  'NODE_PORT',
  'RUNTIME_ENV',
  'PROXY_API_SERVER_URL',
  // integration
  'INTEGRATION_MODE',
  'INTEGRATION_CORE_MOUNT_PATH',
  'INTEGRATION_MOUNT_PATH',
  'INTEGRATION_NODE_BFF_URL',
  'INTEGRATION_CORE_URL',
  // application specific URLs
  'APPLICATION_SERVER_URL_ROOT',
  'APPLICATION_PUBLIC_URL',
  'APPLICATION_USER_DATA_COOKIE_SECRET',
  // cookies settings
  'APPLICATION_COOKIE_PARSER_SECRET',
  'APPLICATION_USER_DATA_COOKIE_NAME',
  'STICK_COOKIES_TO_APPLICATION_PATH',
  // use sso
  'USE_ONELOGIN',
  // onelogin
  'OIDC_ISSUER_URL',
  'OIDC_AUTH_CALLBACK_PATH',
  'OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH',
  'OIDC_CLIENT_ID',
  'OIDC_CLIENT_SECRET',
  'OIDC_REFRESH_TOKEN_SECRET',
  // identity
  'IDENTITY_CLIENT_ID',
  'IDENTITY_CLIENT_SECRET',
  'IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET',
  'IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME',
];

const optionalEnvironmentParameters = [
  'OIDC_ISSUER_URL',
  'OIDC_AUTH_CALLBACK_PATH',
  'OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH',
  'OIDC_CLIENT_ID',
  'OIDC_CLIENT_SECRET',
  'OIDC_REFRESH_TOKEN_SECRET',
];

export class EnvAccessor {
  private static instance: EnvAccessor;
  private variables = {} as NodeJS.ProcessEnv;

  private constructor() {
    this.readEnv();
  }

  static getInstance(): EnvAccessor {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  public validate() {
    Object.entries(this.variables)
      .filter(([key, val]) => !val && !optionalEnvironmentParameters.includes(key))
      .forEach(([key]) => {
        throw Error(`${key} is missing`);
      });
  }

  public getVariables() {
    return this.variables;
  }

  public refresh() {
    this.readEnv();
    return this;
  }

  private readEnv() {
    this.variables = environmentParameters.reduce(
      (acc, envKey) => ({
        ...acc,
        [envKey]: process.env[envKey],
      }),
      {} as NodeJS.ProcessEnv,
    );
  }
}

export const getEnv = () => EnvAccessor.getInstance();
