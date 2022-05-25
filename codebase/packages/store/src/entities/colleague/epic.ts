// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getColleagueByUuid } from './actions';

export const getColleagueByUuidEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagueByUuid.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleagueByUuid(payload)).pipe(
        //@ts-ignore
        map(({ data }) => getColleagueByUuid.success(data)),
        catchError(({ errors }) => of(getColleagueByUuid.failure(errors))),
      );
    }),
  );

export default combineEpics(getColleagueByUuidEpic);
