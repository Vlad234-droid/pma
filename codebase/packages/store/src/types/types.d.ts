import { Reducer } from 'typesafe-actions';
import { Observable } from 'rxjs';
import { Epic as RoEpic, EpicMiddleware as RoEpicMiddleware } from 'redux-observable';
import { Api } from '@pma/api';

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

  export type Services = EpicToDependency<{ api: Api }>;

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
