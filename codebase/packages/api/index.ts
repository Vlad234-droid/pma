import * as api from './src/rest';
export default api;
export type Api = typeof api;
export * from './src/rest/reviewsSharingTypes';
export { default as httpClient } from './src/config/client';
