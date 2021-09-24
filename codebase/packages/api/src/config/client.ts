import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export type Config = {
  [key: string]: string | number | object | undefined;
};

const API_URL = 'http://localhost:9090';
const API_VERSION = '';

let baseURL = `${API_URL}/`;
if (API_VERSION) {
  baseURL += `${API_VERSION}/`;
}

const httpClient = axios.create({ baseURL });

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

    return Promise.reject({
      data,
      message,
      status,
    });
  },
);

export default httpClient;
