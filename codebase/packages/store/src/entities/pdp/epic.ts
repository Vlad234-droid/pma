// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import {
  getPDPGoal,
  createPDPGoal,
  updatePDPGoal,
  getPDPByUUIDGoal,
  deletePDPGoal,
  getEarlyAchievementDate,
} from './actions';

export const getPDPEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getPDPGoal.request)),
    switchMap(() =>
      from(api.getPDPGoal()).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getPDPGoal.success(data);
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
        map(({ data }) => {
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
        mergeMap(({ data }) => {
          const [goal] = data;
          //@ts-ignore
          return from([createPDPGoal.success(goal), getPDPGoal.request()]);
        }),
        catchError(({ errors }) => of(createPDPGoal.failure(errors))),
      );
    }),
  );

export const deletePDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deletePDPGoal.request)),
    switchMap(({ payload }) => {
      return from(api.deletePDPGoal(payload.uuid)).pipe(
        // @ts-ignore
        map(() => {
          return deletePDPGoal.success(payload);
        }),
        catchError(({ errors }) => of(deletePDPGoal.failure(errors))),
      );
    }),
  );

export const updatePDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updatePDPGoal.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.updatePDPGoal(data)).pipe(
        // @ts-ignore
        mergeMap(({ data }) => {
          // @ts-ignore
          return from([updatePDPGoal.success(data), getPDPGoal.request()]);
        }),
        catchError(({ errors }) => of(updatePDPGoal.failure(errors))),
      );
    }),
  );
export const getEarlyAchievementDatepic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getEarlyAchievementDate.request)),
    switchMap(() => {
      return from(api.getEarlyAchievementDate()).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getEarlyAchievementDate.success(data);
        }),
        catchError(({ errors }) => of(getEarlyAchievementDate.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getPDPEpic,
  getPDPByUUIDEpic,
  createPDPEpic,
  updatePDPEpic,
  deletePDPEpic,
  getEarlyAchievementDatepic,
);
