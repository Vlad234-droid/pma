// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { getConfigEntries, getConfigEntriesByUuid } from './actions';

export const getConfigEntriesEpic: Epic = (action$, _, { api }) => {
  const getItems = async (data) => {
    const result = await data;
    const results = await Promise.all(
      result.data.map(({ uuid }) => {
        //return api.getConfigEntriesByUuid({ uuid });
        return api.getConfigEntriesByUuid({ uuid });
      }),
    );
    return results;
  };
  return action$.pipe(
    filter(isActionOf(getConfigEntries.request)),
    switchMap(() =>
      from(api.getConfigEntries()).pipe(
        map((data) => {
          //getItems(data);
          //getConfigEntriesByUuid.request({ uuid: 1 });
          return getConfigEntries.success(data);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getConfigEntries.failure(errors?.[0]));
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
          return of(getConfigEntriesByUuid.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getConfigEntriesByUuid.cancel)))),
      ),
    ),
  );

export default combineEpics(getConfigEntriesEpic, getConfigEntriesByUuidEpic);
