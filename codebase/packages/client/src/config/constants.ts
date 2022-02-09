export const PUBLIC_URL = process?.env?.PUBLIC_URL ?? '/';
export const API_URL = process.env.REACT_APP_API_URL ?? '/api';
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const INTEGRATION_MODE = process.env.REACT_APP_INTEGRATION_MODE ?? 'integrity';

export const LOGOUT_URL = process?.env?.REACT_APP_LOGOUT_URL ?? '/sso/logout';

const SIGN_OUT = PUBLIC_URL === '/' ? LOGOUT_URL : `${PUBLIC_URL}${LOGOUT_URL}`;

export const LINKS = {
  signOut: SIGN_OUT,
};

const { protocol, hostname, port } = location;

const portValue = port ? `:${port}` : '';
const rootPath = `${protocol}//${hostname}${portValue}`;
const mountPath = `${rootPath}${PUBLIC_URL == '/' ? '' : PUBLIC_URL}`;

function getEnv(): 'dev' | 'prod' | 'local' {
  if (process.env.NODE_ENV == 'development') return 'dev';
  if (process.env.NODE_ENV == 'production') return 'prod';
  return 'local';
}

export const CONFIG = {
  mountPath,
  env: getEnv(),
  applicationName: 'Performance Management Application',
  signOut: `${rootPath}}${SIGN_OUT}`,
  isDevelopment: process.env.NODE_ENV == 'development',
  myInboxPath: `${mountPath}/my-inbox/api/colleague-inbox`,
};

let baseURL = `${API_URL}/`;

if (API_VERSION) {
  baseURL += `${API_VERSION}/`;
}

export enum ViewportSize {
  PHONE = 320,
  LARGE_PHONE = 504,
  TABLET = 756,
  LARGE_TABLET = 768,
  SMALL_DESKTOP = 1025,
  DESKTOP = 1260,
  LARGE_DESKTOP = 1920,
}

export const BASE_URL_API = baseURL;
