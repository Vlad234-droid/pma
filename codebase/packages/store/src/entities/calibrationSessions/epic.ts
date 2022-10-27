// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { RestResponseListCalibrationSession } from '@pma/openapi';
import { getCalibrationSessions, createCalibrationSession } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationSessionsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCalibrationSessions.request)),
    switchMap(({ payload }) =>
      from(api.getCalibrationSessions(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseListCalibrationSession) => {
          if (!success) {
            return createCalibrationSession.failure(new Error(errors?.[0].message || undefined));
          }
          return getCalibrationSessions.success({ data: data || [] });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getCalibrationSessions.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getCalibrationSessions.cancel)))),
      ),
    ),
  );

export const createReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createCalibrationSession.request)),
    switchMap(({ payload }: any) => {
      // @ts-ignore
      return from(api.createCalibrationSessions(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseListCalibrationSession) => {
          if (!success) {
            return createCalibrationSession.failure(new Error(errors?.[0].message || undefined));
          }
          return createCalibrationSession.success({ data: data || [] });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(createCalibrationSession.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export default combineEpics(getCalibrationSessionsEpic, createReviewEpic);
