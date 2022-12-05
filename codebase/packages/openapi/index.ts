import { AxiosResponse, AxiosPromise } from 'axios';
import { Configuration, ConfigurationParameters, FileApi, UserApi, CmsApi, ConfigApi } from './src/openapi';
import client from './src/config/client';

const apis = {
  user: UserApi,
  file: FileApi,
  cms: CmsApi,
  config: ConfigApi,
};

type Api = {
  user: UserApi;
  file: FileApi;
  cms: CmsApi;
  config: ConfigApi;
};

const createApiClient = (configuration: ConfigurationParameters = {}): Api =>
  Object.keys(apis).reduce(
    (acc, key) => ({ ...acc, [key]: new apis[key](new Configuration(configuration), configuration.basePath, client) }),
    {} as Api,
  );

export type { AxiosResponse, AxiosPromise, Api };
export { createApiClient };
export * from './src/openapi';
