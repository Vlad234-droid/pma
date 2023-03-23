// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { EMPTY, from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getColleagues, getProfileColleague } from './actions';

export const getColleaguesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagues.request)),
    switchMap<
      {
        payload:
          | { 'first-name_like': string; 'last-name_like': string }
          | { email_like: string }
          | { _groups: [{ 'first-name_like': string; 'last-name_like': string; _type: 'AND' }] };
      },
      any
    >(({ payload }) => {
      let isHavingInvalidParams = false;

      if ('first-name_like' in payload) {
        isHavingInvalidParams = !payload['first-name_like'].length && !payload['last-name_like'].length;
      }

      if ('email_like' in payload) {
        isHavingInvalidParams = !payload.email_like.length;
      }

      if ('_groups' in payload) {
        isHavingInvalidParams =
          !payload._groups[0]['first-name_like'].length && !payload._groups[0]['last-name_like'].length;
      }

      if (isHavingInvalidParams) {
        return EMPTY;
      }
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

export default combineEpics(getColleaguesEpic, getProfileColleagueEpic);
