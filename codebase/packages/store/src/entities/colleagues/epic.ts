// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, debounceTime } from 'rxjs/operators';
import { getColleagues } from './actions';

export const getColleaguesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    debounceTime(1000),
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

export default combineEpics(getColleaguesEpic);
