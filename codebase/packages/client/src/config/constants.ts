export const PUBLIC_URL = process.env.PUBLIC_URL ?? '/';
export const API_URL = process.env.REACT_APP_API_URL ?? '/api';

export const INTEGRATION_MODE = process.env.REACT_APP_INTEGRATION_MODE ?? 'integrity';

export const LOGOUT_URL = process.env.REACT_APP_LOGOUT_URL ?? '/sso/logout';

export const LINKS = {
  signOut: LOGOUT_URL,
};

export enum ViewportSize {
  PHONE = 320,
  LARGE_PHONE = 504,
  TABLET = 756,
  LARGE_TABLET = 768,
  SMALL_DESKTOP = 1025,
  DESKTOP = 1260,
  LARGE_DESKTOP = 1920,
}
