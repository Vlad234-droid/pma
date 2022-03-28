// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

import { getConfigEntries, getConfigEntriesByUuid } from './actions';

export const getConfigEntriesEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getConfigEntries.request)),
    switchMap(() =>
      from(api.getConfigEntries()).pipe(
        map((data) => {
          return getConfigEntries.success(data);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getConfigEntries.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Config fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getConfigEntries.cancel)))),
      ),
    ),
  );
};

export const getConfigEntriesByUuidEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getConfigEntriesByUuid.request)),

    switchMap(({ payload }) =>
      from(api.getConfigEntriesByUuid({ uuid: payload.uuid })).pipe(
        map(getConfigEntriesByUuid.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getConfigEntriesByUuid.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Config entries by uuid fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getConfigEntriesByUuid.cancel)))),
      ),
    ),
  );

export default combineEpics(getConfigEntriesEpic, getConfigEntriesByUuidEpic);
