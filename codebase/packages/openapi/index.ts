import { AxiosResponse } from 'axios';
import { Configuration, ConfigurationParameters, FileApi, UserApi, CMSApi, ConfigApi } from './src/openapi';
import client from './src/config/client';

const apis = {
  user: UserApi,
  file: FileApi,
  cms: CMSApi,
  config: ConfigApi,
};

type Api = {
  user: UserApi;
  file: FileApi;
  cms: CMSApi;
  config: ConfigApi;
};

const createApiClient = (configuration: ConfigurationParameters = {}): Api =>
  Object.keys(apis).reduce(
    (acc, key) => ({ ...acc, [key]: new apis[key](new Configuration(configuration), configuration.basePath, client) }),
    {} as Api,
  );

export type { AxiosResponse, Api };
export { createApiClient };
export * from './src/openapi';
