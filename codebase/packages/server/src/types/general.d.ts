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

  interface ProcessEnv {
    // General
    NODE_PORT: number;
    NODE_ENV: keyof typeof Environment;
    RUNTIME_ENV: keyof typeof Environment;
    BUILD_ENV: 'development' | 'ppe' | 'production';
    PROXY_API_SERVER_URL: string;
    LOGGER_ROOT_NAME: string | undefined;
    LOGGER_LEVEL: string;
    LOGGER_PRETIFY: boolean | undefined;

    // Integration
    INTEGRATION_MODE: keyof typeof AppMode;
    INTEGRATION_CORE_MOUNT_PATH: string;
    INTEGRATION_MOUNT_PATH: string;
    INTEGRATION_NODE_BFF_URL: string;
    INTEGRATION_CORE_URL: string;

    // Application specific
    APPLICATION_SERVER_URL_ROOT: string;
    APPLICATION_PUBLIC_URL: string;
    APPLICATION_USER_DATA_COOKIE_NAME: string;
    APPLICATION_USER_DATA_COOKIE_SECRET: string;
    APPLICATION_COOKIE_PARSER_SECRET: string;
    STICK_COOKIES_TO_APPLICATION_PATH: boolean;

    // SSO turn on or off
    USE_ONELOGIN: boolean;

    // One login
    OIDC_ISSUER_URL: string;
    OIDC_AUTH_CALLBACK_PATH: string;
    OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH: string;
    OIDC_CLIENT_ID: string;
    OIDC_CLIENT_SECRET: string;
    OIDC_REFRESH_TOKEN_SECRET: string;

    // Roles groups
    OIDC_GROUPS_ADMIN_ROLE: string;
    OIDC_GROUPS_MANAGER_ROLE: string;
    OIDC_GROUPS_VIEWER_ROLE: string;

    // Identity
    IDENTITY_CLIENT_ID: string;
    IDENTITY_CLIENT_SECRET: string;
    IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: string;
    IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: string;
  }

  export interface Process {
    env: ProcessEnv;
  }
}
