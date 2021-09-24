// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { getCurrentUser } from './actions';

export const getCurrentUserEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCurrentUser.request)),
    switchMap(() =>
      from(api.getCurrentUser()).pipe(
        map(getCurrentUser.success),
        catchError((e) => {
          const errors = e?.data.errors;
          return of(getCurrentUser.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getCurrentUser.cancel)))),
      ),
    ),
  );

export default combineEpics(getCurrentUserEpic);
