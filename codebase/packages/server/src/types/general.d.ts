declare interface Window {
  __MY_WORK_CONFIG__: Object;
}

declare namespace NodeJS {
  enum AppMode {
    standalone = 'standalone',
    integrity = 'integrity',
  }

  enum Environment {
    local = 'local',
    dev = 'dev',
    ppe = 'ppe',
    prod = 'prod',
  }

  enum LogLevel {
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
  }

  interface ProcessEnv {
    // General
    NODE_PORT: number;
    NODE_ENV: keyof typeof Environment;
    RUNTIME_ENV: keyof typeof Environment;
    BUILD_ENV: keyof typeof Environment | undefined;

    API_SERVER_URL: string;
    API_IAM_SERVER_URL: string;
    API_MANAGEMENT_SERVER_URL: string;
    SWAGGER_SERVER_URL: string;
    CAMUNDA_SERVER_URL: string;

    LOGGER_ROOT_NAME: string;
    LOGGER_LEVEL?: keyof typeof LogLevel;
    LOGGER_PRETIFY: string | undefined;
    LOGGER_THEME: string | undefined;
    LOGGER_LOG_AUTH_TOKEN: string | undefined;

    // Integration
    INTEGRATION_MODE: keyof typeof AppMode;
    INTEGRATION_CORE_MOUNT_PATH: string;
    INTEGRATION_MOUNT_PATH: string;
    INTEGRATION_NODE_BFF_URL: string;
    INTEGRATION_CORE_URL: string;

    // Application specific
    APPLICATION_NAME: string | undefined;
    APPLICATION_URL: string;
    APPLICATION_SERVER_URL_ROOT: string;
    APPLICATION_PUBLIC_URL: string;

    // cookie settings
    APPLICATION_AUTH_TOKEN_COOKIE_NAME: string | undefined;
    APPLICATION_SESSION_COOKIE_NAME: string | undefined;
    APPLICATION_USER_DATA_COOKIE_NAME: string;
    APPLICATION_USER_DATA_COOKIE_SECRET: string;
    APPLICATION_COOKIE_PARSER_SECRET: string;
    STICK_COOKIES_TO_APPLICATION_PATH: boolean;

    // SSO turn on or off
    USE_ONELOGIN: boolean;

    // requireIdentityToken turn on or off
    USE_REQUIRE_IDENTITY_TOKEN: boolean;

    // One login
    OIDC_ISSUER_URL: string;
    OIDC_AUTH_CALLBACK_PATH: string;
    OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH: string;
    OIDC_CLIENT_ID: string;
    OIDC_CLIENT_SECRET: string;
    OIDC_REFRESH_TOKEN_SECRET: string;

    // Identity
    IDENTITY_CLIENT_ID: string;
    IDENTITY_CLIENT_SECRET: string;
    IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: string;
    IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: string;

    //splunk
    // SPLUNK_SOURCETYPE: string;
    // SPLUNK_TOKEN_SECRET: string;

    CICD_RELEASE_RELEASENAME: string | undefined;
  }

  export interface Process {
    env: ProcessEnv;
  }
}
