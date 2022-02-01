import { AxiosRequestConfig, AxiosResponse as Response } from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  }

  export interface AxiosResponse extends Response {
    success: boolean;
    errors: any;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosPromise<T = any> extends Promise<T> {}
}
