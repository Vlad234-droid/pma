export const PUBLIC_URL = process?.env?.PUBLIC_URL ?? '/';
export const API_URL = process.env.REACT_APP_API_URL ?? '/api';
export const CAMUNDA_APP_PATH = process.env.REACT_APP_CAMUNDA_APP_PATH ?? 'camunda/app/';

export const INTEGRATION_MODE = process.env.REACT_APP_INTEGRATION_MODE ?? 'integrity';

export const LOGOUT_URL = process?.env?.REACT_APP_LOGOUT_URL ?? '/sso/logout';

const SIGN_OUT = PUBLIC_URL === '/' ? LOGOUT_URL : `${PUBLIC_URL}${LOGOUT_URL}`;
const HELP = 'https://www.ourtesco.com/colleague/help';

export const LINKS = {
  signOut: SIGN_OUT,
  help: HELP,
};

export const USER = {
  current: 'me',
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

let baseURL = `${API_URL}`;

export enum ViewportSize {
  PHONE = 320,
  LARGE_PHONE = 504,
  TABLET = 756,
  LARGE_TABLET = 768,
  SMALL_DESKTOP = 1025,
  DESKTOP = 1260,
  LARGE_DESKTOP = 1920,
}

export const RICH_TEXT_CHARACTERS_LIMIT = 10000;

export const BASE_URL_API = baseURL;

export const APP_DYNAMICS_APP_KEY = process.env.REACT_APP_DYNAMICS_APP_KEY;
