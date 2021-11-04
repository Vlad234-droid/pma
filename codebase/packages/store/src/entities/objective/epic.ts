// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import {
  approveObjective,
  createObjective,
  declineObjective,
  deleteObjective,
  getObjectives,
  updateObjective,
  updateObjectives,
} from './actions';

export const getObjectivesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getObjectives.request)),
    switchMap(({ payload }) =>
      from(api.getObjectives(payload)).pipe(
        // @ts-ignore
        map(({ success, data }) => {
          return getObjectives.success({ origin: data });
        }),
        catchError(({ errors }) => of(getObjectives.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getObjectives.cancel)))),
      ),
    ),
  );

export const updateObjectiveEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateObjective.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.updateObjective(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getObjectives.request(data);
        }),
        catchError(({ errors }) => of(updateObjective.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(updateObjective.cancel)))),
      );
    }),
  );

export const createObjectiveEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createObjective.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.createObjective(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getObjectives.request(data);
        }),
        catchError(({ errors }) => of(createObjective.failure(errors))),
      );
    }),
  );

export const updateObjectivesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateObjectives.request)),
    switchMap(({ payload }) => {
      const { origin } = payload;
      return from(api.updateObjectives(origin)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return updateObjectives.success({ origin: data });
        }),
        catchError(({ errors }) => of(updateObjectives.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(updateObjectives.cancel)))),
      );
    }),
  );

export const approveObjectivesEpic: Epic = (action$, _, { api }) => {
  console.log({ api });
  return action$.pipe(
    filter(isActionOf(approveObjective.request)),
    switchMap(({ payload }) => {
      return from(api.approveObjective(payload)).pipe(
        map(approveObjective.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(approveObjective.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(approveObjective.cancel)))),
      );
    }),
  );
};

export const declineObjectivesEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(declineObjective.request)),
    switchMap(({ payload }) => {
      return from(api.declineObjective(payload)).pipe(
        map(declineObjective.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(declineObjective.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(declineObjective.cancel)))),
      );
    }),
  );
};

export const deleteObjectiveEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deleteObjective.request)),
    switchMap(({ payload }) => {
      return from(api.deleteObjective(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getObjectives.request(data);
        }),
        catchError(({ errors }) => of(deleteObjective.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(deleteObjective.cancel)))),
      );
    }),
  );

export default combineEpics(
  getObjectivesEpic,
  updateObjectivesEpic,
  approveObjectivesEpic,
  declineObjectivesEpic,
  updateObjectiveEpic,
  deleteObjectiveEpic,
  createObjectiveEpic,
);
