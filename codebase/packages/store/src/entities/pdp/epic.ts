// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { getPDPGoal, createPDPGoal, updatePDPGoal } from './actions';

export const getPDPEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getPDPGoal.request)),
    switchMap(({ payload }) =>
      from(api.getPDPGoal()).pipe(
        // @ts-ignore
        map(({ success, data }) => {
          getPDPGoal;
          // console.log('============== ', data);
          return getPDPGoal.success({ origin: data });
        }),
        catchError(({ errors }) => of(getPDPGoal.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getPDPGoal.cancel)))),
      ),
    ),
  );
}

export const createPDPEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createPDPGoal.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.createPDPGoal(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return createPDPGoal.request(data);
        }),
        catchError(({ errors }) => of(createPDPGoal.failure(errors))),
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
          return updatePDPGoal.request(data);
        }),
        catchError(({ errors }) => of(updatePDPGoal.failure(errors))),
      );
    }),
  );

  export default combineEpics(
    getPDPEpic,
    createPDPEpic,
    updadePDPEpic,
  );
