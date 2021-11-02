// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { getSchema, clearSchemaData } from './actions';

export const getSchemaEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getSchema.request)),
    switchMap(() =>
      from(api.getSchema()).pipe(
        // @ts-ignore
        map(({ success, data }) => getSchema.success(data)),
        catchError(({ errors }) => of(getSchema.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getSchema.cancel)))),
      ),
    ),
  );

export default combineEpics(getSchemaEpic);
