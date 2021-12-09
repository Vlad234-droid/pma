// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { createPerformanceCycle, getGetAllPerformanceCycles, getPerformanceCycleByUuid } from './actions';

export const getGetAllPerformanceCyclesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getGetAllPerformanceCycles.request)),
    switchMap(() =>
      from(api.getGetAllPerformanceCycles()).pipe(
        map(getGetAllPerformanceCycles.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getGetAllPerformanceCycles.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getGetAllPerformanceCycles.cancel)))),
      ),
    ),
  );

export const getGetPerformanceCyclesByUuidEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getPerformanceCycleByUuid.request)),
    switchMap(({ payload }) =>
      from(api.getPerformanceCycleByUuid(payload)).pipe(
        map(getPerformanceCycleByUuid.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getPerformanceCycleByUuid.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getPerformanceCycleByUuid.cancel)))),
      ),
    ),
  );

export const createPerformanceCyclesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createPerformanceCycle.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.createPerformanceCycle(data)).pipe(
        // @ts-ignore
        map(() => {
          return getGetAllPerformanceCycles.request();
        }),
        catchError(({ errors }) => of(createPerformanceCycle.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getGetAllPerformanceCyclesEpic,
  getGetPerformanceCyclesByUuidEpic,
  createPerformanceCyclesEpic,
);
