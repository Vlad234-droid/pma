import {
  // @ts-ignore
  Epic,
  isActionOf,
} from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, filter, switchMap, catchError, takeUntil } from 'rxjs/operators';

import { loginAsync } from './actions';

export const loginEpic: Epic = (action$, _, { auth }) =>
  action$.pipe(
    filter(isActionOf(loginAsync.request)),
    switchMap(({ payload }) =>
      from(auth.login(payload)).pipe(
        // @ts-ignore
        map(({ token }) => {
          if (!token) {
            return loginAsync.failure(new Error('failed login'));
          }
          return loginAsync.success({ authorized: true });
        }),
        catchError((err) => of(loginAsync.failure(err))),
        takeUntil(action$.pipe(filter(isActionOf(loginAsync.cancel)))),
      ),
    ),
  );

export default combineEpics(loginEpic);
