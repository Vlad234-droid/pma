// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { startSharing, stopSharing, checkSharing, getSharings } from './actions';

export const stopSharingEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(stopSharing.request)),
    switchMap(({ payload }) => {
      return from(api.stopSharingColleagueObjectives(payload)).pipe(
        map(stopSharing.success),
        catchError(({ errors }) => of(stopSharing.failure(errors))),
      );
    }),
  );
};

export const checkSharingEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(checkSharing.request)),
    switchMap(({ payload }) => {
      return from(api.checkColleagueObjectivesShared(payload)).pipe(
        map(checkSharing.success),
        catchError(({ errors }) => of(checkSharing.failure(errors))),
      );
    }),
  );
};

export const getSharingsEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getSharings.request)),
    switchMap(({ payload }) => {
      return from(api.getAllCharedObjectives(payload)).pipe(
        map(getSharings.success),
        catchError(({ errors }) => of(getSharings.failure(errors))),
      );
    }),
  );
};

export const startSharingEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(startSharing.request)),
    switchMap(({ payload }) => {
      return from(api.shareColleagueObjectives(payload)).pipe(
        map(startSharing.success),
        catchError(({ errors }) => of(startSharing.failure(errors))),
      );
    }),
  );
};

export default combineEpics(stopSharingEpic, checkSharingEpic, getSharingsEpic, startSharingEpic);
