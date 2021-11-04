// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getManagers } from './actions';

export const getManagersEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getManagers.request)),
    switchMap(() =>
      from(api.getManagers()).pipe(
        map(getManagers.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getManagers.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getManagers.cancel)))),
      ),
    ),
  );

export default combineEpics(getManagersEpic);
