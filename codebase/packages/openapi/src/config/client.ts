import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { redirectToAuth } from '../utils/redirectToAuth';

export type Config = {
  [key: string]: string | number | object | undefined;
};

enum ResponseStatus {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

const httpClient = axios.create({});

httpClient.defaults.paramsSerializer = (params) => qs.stringify(params);

httpClient.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  ({ data }) => data,
  (responseData = {}) => {
    const { response, message } = responseData;
    const data = response.data;
    const status = response.status;

    if (ResponseStatus.UNAUTHORIZED === status) {
      // console.log(`Got 401 Unauthorized response from API. Enforcing authentication.`);
      redirectToAuth(window.location.pathname);
    } else {
      return Promise.reject({ data, message, status });
    }
  },
);

export default httpClient;
