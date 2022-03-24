// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

import {
  createPerformanceCycle,
  getGetAllPerformanceCycles,
  getPerformanceCycleByUuid,
  publishPerformanceCycle,
  updatePerformanceCycle,
  getPerformanceCycleMappingKeys,
} from './actions';

export const getGetAllPerformanceCyclesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getGetAllPerformanceCycles.request)),
    switchMap(() =>
      from(api.getGetAllPerformanceCycles()).pipe(
        //@ts-ignore
        map(({ data }) => getGetAllPerformanceCycles.success(data)),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getGetAllPerformanceCycles.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Performance cycle fetch error' }),
          );
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
        // @ts-ignore
        map(({ data }) => {
          return getPerformanceCycleByUuid.success(data);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getPerformanceCycleByUuid.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Performance cycle by UUID fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getPerformanceCycleByUuid.cancel)))),
      ),
    ),
  );

export const createPerformanceCyclesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createPerformanceCycle.request)),
    switchMap(({ payload }) => {
      return from(api.createPerformanceCycle(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return createPerformanceCycle.success(data);
        }),
        catchError((error) => {
          const { errors } = error?.data || {};
          return of(updatePerformanceCycle.failure(errors));
        }),
      );
    }),
  );

export const updatePerformanceCyclesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updatePerformanceCycle.request)),
    switchMap(({ payload }) => {
      return from(api.updatePerformanceCycle(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return updatePerformanceCycle.success(data);
        }),
        catchError((error) => {
          const { errors } = error?.data || {};
          return of(updatePerformanceCycle.failure(errors));
        }),
      );
    }),
  );

export const publishPerformanceCyclesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(publishPerformanceCycle.request)),
    switchMap(({ payload }) => {
      return from(api.publishPerformanceCycle(payload)).pipe(
        // @ts-ignore
        map(() => {
          return getGetAllPerformanceCycles.request();
        }),
        catchError(({ errors }) => of(publishPerformanceCycle.failure(errors))),
      );
    }),
  );

export const getPerformanceCycleMappingKeysEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getPerformanceCycleMappingKeys.request)),
    switchMap(() => {
      return from(api.getPerformanceCycleMappingKeys()).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getPerformanceCycleMappingKeys.success(data);
        }),
        catchError(({ errors }) => of(getPerformanceCycleMappingKeys.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getGetAllPerformanceCyclesEpic,
  getGetPerformanceCyclesByUuidEpic,
  createPerformanceCyclesEpic,
  updatePerformanceCyclesEpic,
  publishPerformanceCyclesEpic,
  getPerformanceCycleMappingKeysEpic,
);
