import { AxiosResponse } from 'axios';
import { UserApi, Configuration, ConfigurationParameters } from './src/openapi';
import client from './src/config/client';

const apis = {
  user: UserApi,
};

type Api = {
  user: UserApi;
};

const createApiClient = (configuration: ConfigurationParameters = {}): Api =>
  Object.keys(apis).reduce(
    (acc, key) => ({ ...acc, [key]: new apis[key](new Configuration(configuration), configuration.basePath, client) }),
    {} as Api,
  );

export type { AxiosResponse, Api };
export { createApiClient };
export * from './src/openapi';
