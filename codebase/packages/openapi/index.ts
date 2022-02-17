import { AxiosResponse } from 'axios';
import { Configuration, ConfigurationParameters, FileApi, UserApi, CMSApi } from './src/openapi';
import client from './src/config/client';

const apis = {
  user: UserApi,
  file: FileApi,
  cms: CMSApi,
};

type Api = {
  user: UserApi;
  file: FileApi;
  cms: CMSApi;
};

const createApiClient = (configuration: ConfigurationParameters = {}): Api =>
  Object.keys(apis).reduce(
    (acc, key) => ({ ...acc, [key]: new apis[key](new Configuration(configuration), configuration.basePath, client) }),
    {} as Api,
  );

export type { AxiosResponse, Api };
export { createApiClient };
export * from './src/openapi';
