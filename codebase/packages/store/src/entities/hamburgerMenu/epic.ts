// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { getTopMenu, getBottomMenu } from './actions';

export const getMenuTopDataEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getTopMenu.request)),
    switchMap(({ payload }) =>
      from(api.getMenuData(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getTopMenu.success({ data: data });
        }),
        catchError(({ errors }) => of(getTopMenu.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getTopMenu.cancel)))),
      ),
    ),
  );
};
export const getMenuBottomDataEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getBottomMenu.request)),
    switchMap(({ payload }) =>
      from(api.getMenuData(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getBottomMenu.success({ data: data });
        }),
        catchError(({ errors }) => of(getBottomMenu.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getBottomMenu.cancel)))),
      ),
    ),
  );
};

export default combineEpics(getMenuTopDataEpic, getMenuBottomDataEpic);
