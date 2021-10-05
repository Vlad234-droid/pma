// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { getCurrentUser } from './actions';

export const getCurrentUserEpic: Epic = (action$, _, { openapi }) =>
  action$.pipe(
    filter(isActionOf(getCurrentUser.request)),
    switchMap(() =>
      from(openapi.profile.getProfileByColleagueUuid({ colleagueUuid: 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6' })).pipe(
        map(getCurrentUser.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getCurrentUser.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getCurrentUser.cancel)))),
      ),
    ),
  );

export default combineEpics(getCurrentUserEpic);
