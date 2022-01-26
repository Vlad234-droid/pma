// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getManagers } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getManagersEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getManagers.request)),
    switchMap(({ payload }) => {
      return from(api.getManagers(payload)).pipe(
        map(getManagers.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getManagers.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Managers fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getManagers.cancel)))),
      );
    }),
  );

export default combineEpics(getManagersEpic);
