// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { getPDPGoal, createPDPGoal, updatePDPGoal, getPDPByUUIDGoal, deletePDPGoal } from './actions';

export const getPDPEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getPDPGoal.request)),
    switchMap(({ payload }) =>
      from(api.getPDPGoal()).pipe(
        // @ts-ignore
        map(({ success, data }) => {
          getPDPGoal;
          return getPDPGoal.success({ pdp: data });
        }),
        catchError(({ errors }) => of(getPDPGoal.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getPDPGoal.cancel)))),
      ),
    ),
  );
};

export const getPDPByUUIDEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getPDPByUUIDGoal.request)),
    switchMap(({ payload }) =>
      from(api.getPDPByUUIDGoal(payload)).pipe(
        // @ts-ignore
        map(({ success, data }) => {
          getPDPByUUIDGoal;
          return getPDPByUUIDGoal.success({ pdp: data });
        }),
        catchError(({ errors }) => of(getPDPGoal.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getPDPGoal.cancel)))),
      ),
    ),
  );
};

export const createPDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createPDPGoal.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.createPDPGoal(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return createPDPGoal.success(data);
        }),
        catchError(({ errors }) => of(createPDPGoal.failure(errors))),
      );
    }),
  );

// try to optimiz in future
export const createAndFetchPDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createPDPGoal.success)),
    switchMap(({ payload }) => {
      return from(api.getPDPGoal()).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getPDPGoal.request({});
        }),
        catchError(({ errors }) => of(createPDPGoal.failure(errors))),
      );
    }),
  );

export const deletePDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deletePDPGoal.request)),
    switchMap(({ payload }) => {
      const data = payload.data;
      return from(api.deletePDPGoal(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return deletePDPGoal.success(data);
        }),
        catchError(({ errors }) => of(deletePDPGoal.failure(errors))),
      );
    }),
  );

// try to optimiz in future
export const deleteAndFetchPDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deletePDPGoal.success)),
    switchMap(({ payload }) => {
      return from(api.getPDPGoal()).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getPDPGoal.request({});
        }),
        catchError(({ errors }) => of(getPDPGoal.failure(errors))),
      );
    }),
  );

export const updadePDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updatePDPGoal.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.updatePDPGoal(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return updatePDPGoal.success(data);
        }),
        catchError(({ errors }) => of(updatePDPGoal.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getPDPEpic,
  getPDPByUUIDEpic,
  createPDPEpic,
  updadePDPEpic,
  deletePDPEpic,
  deleteAndFetchPDPEpic,
  createAndFetchPDPEpic,
);
