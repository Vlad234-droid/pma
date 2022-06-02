// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getColleagues, getProfileColleague, getColleague } from './actions';

export const getColleaguesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagues.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleagues(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getColleagues.success(data);
        }),
        catchError(({ errors }) => of(getColleagues.failure(errors))),
      );
    }),
  );

export const getColleagueEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleague.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleague(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getColleague.success(data);
        }),
        catchError(({ errors }) => of(getColleague.failure(errors))),
      );
    }),
  );

export const getProfileColleagueEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getProfileColleague.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getProfileColleague(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getProfileColleague.success(data);
        }),
        catchError(({ errors }) => of(getColleagues.failure(errors))),
      );
    }),
  );

export default combineEpics(getColleaguesEpic, getProfileColleagueEpic, getColleagueEpic);
