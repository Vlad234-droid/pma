// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { RestResponseListCalibrationColleague, RestResponseListColleagueSimple } from '@pma/openapi';
import { getColleagueSimple, getSessionColleagueSimple } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationColleaguesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagueSimple.request)),
    switchMap(({ payload }) =>
      from(api.getCalibrationColleagues(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseListCalibrationColleague) => {
          if (!success) {
            return getColleagueSimple.failure(new Error(errors?.[0].message || undefined));
          }
          return getColleagueSimple.success({ data: data || [] });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getColleagueSimple.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getColleagueSimple.cancel)))),
      ),
    ),
  );

export const getSessionColleagueSimpleEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getSessionColleagueSimple.request)),
    switchMap(({ payload }) =>
      from(api.getCalibrationSessionColleagues(payload.query, payload.sessionId)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseListColleagueSimple) => {
          if (!success) {
            return getSessionColleagueSimple.failure(new Error(errors?.[0].message || undefined));
          }
          return getSessionColleagueSimple.success({ data: data || [] });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getSessionColleagueSimple.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getSessionColleagueSimple.cancel)))),
      ),
    ),
  );

export default combineEpics(getCalibrationColleaguesEpic, getSessionColleagueSimpleEpic);
