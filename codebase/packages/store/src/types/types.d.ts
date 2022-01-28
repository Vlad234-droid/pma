import { Reducer } from 'typesafe-actions';
import { Observable } from 'rxjs';
import { Epic as RoEpic, EpicMiddleware as RoEpicMiddleware } from 'redux-observable';
import { Api } from '@pma/api';
import { Api as OpenApi } from '@pma/openapi';

type PromiseAsObservable<T> = {
  [K in keyof T]: T[K] extends () => Promise<infer U> ? () => Observable<U> | Promise<U> : T[K];
};

type EpicToDependency<T> = {
  [K in keyof T]: PromiseAsObservable<T[K]>;
};

declare module '@pma/store' {}

declare module 'typesafe-actions' {
  export type RootAction = import('../config/actions');

  export type RootState = import('../config/initialState').State;

  export type RootReducer = Reducer<RootState, RootAction>;

  export type Services = EpicToDependency<{ api: Api; openapi: OpenApi }>;

  export type Epic = RoEpic<RootAction, RootAction, RootState, Services>;

  export type EpicMiddleware = RoEpicMiddleware<RootAction, RootAction, RootState, Services>;
}

declare module 'react-redux' {
  export type RootState = import('../config/initialState').State;
  function useSelector<TSelected>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected;
}

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
