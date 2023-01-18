// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { RestResponseListCalibrationSession, RestResponseCalibrationSession } from '@pma/openapi';
import {
  getCalibrationSessions,
  createCalibrationSession,
  updateCalibrationSession,
  deleteCalibrationSession,
  startCalibrationSession,
  closeCalibrationSession,
  cancelCalibrationSession,
} from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationSessionsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCalibrationSessions.request)),
    switchMap(({ payload }) =>
      from(api.getCalibrationSessions(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseListCalibrationSession) => {
          if (!success) {
            return getCalibrationSessions.failure(new Error(errors?.[0].message || undefined));
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

export const createCalibrationSessionEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createCalibrationSession.request)),
    switchMap(({ payload }: any) => {
      // @ts-ignore
      return from(api.createCalibrationSessions(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseCalibrationSession) => {
          if (!success) {
            return createCalibrationSession.failure(new Error(errors?.[0].message || undefined));
          }
          return createCalibrationSession.success({ data: data || {} });
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

export const updateCalibrationSessionEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateCalibrationSession.request)),
    switchMap(({ payload }: any) => {
      // @ts-ignore
      return from(api.updateCalibrationSessions(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseCalibrationSession) => {
          if (!success) {
            return updateCalibrationSession.failure(new Error(errors?.[0].message || undefined));
          }
          return updateCalibrationSession.success({ data: data || {} });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(updateCalibrationSession.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export const deleteCalibrationSessionEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(deleteCalibrationSession.request)),
    switchMap(({ payload }) => {
      // @ts-ignore
      return from(api.deleteCalibrationSessions(payload)).pipe(
        //@ts-ignore
        mergeMap(({ success, data, errors }) => {
          if (!success) {
            return from([deleteCalibrationSession.failure(new Error(errors?.[0].message || undefined))]);
          }
          return from([deleteCalibrationSession.success({ data }), getCalibrationSessions.request({})]);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(deleteCalibrationSession.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export const cancelCalibrationSessionEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(cancelCalibrationSession.request)),
    switchMap(({ payload }) => {
      // @ts-ignore
      return from(api.cancelCalibrationSession(payload.uuid)).pipe(
        //@ts-ignore
        mergeMap(({ success, data, errors }) => {
          if (!success) {
            return from([cancelCalibrationSession.failure(new Error(errors?.[0].message || undefined))]);
          }
          return from([cancelCalibrationSession.success({ data }), getCalibrationSessions.request({})]);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(cancelCalibrationSession.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export const startCalibrationSessionEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(startCalibrationSession.request)),
    switchMap(({ payload }) => {
      // @ts-ignore
      return from(api.startCalibrationSession(payload)).pipe(
        //@ts-ignore
        mergeMap(({ success, data, errors }) => {
          if (!success) {
            return from([startCalibrationSession.failure(new Error(errors?.[0].message || undefined))]);
          }
          return from([startCalibrationSession.success({ data })]);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(startCalibrationSession.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export const closeCalibrationSessionEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(closeCalibrationSession.request)),
    switchMap(({ payload }) => {
      // @ts-ignore
      return from(api.closeCalibrationSession(payload)).pipe(
        //@ts-ignore
        mergeMap(({ success, data, errors }) => {
          if (!success) {
            return from([closeCalibrationSession.failure(new Error(errors?.[0].message || undefined))]);
          }
          return from([closeCalibrationSession.success({ data })]);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(closeCalibrationSession.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export default combineEpics(
  getCalibrationSessionsEpic,
  createCalibrationSessionEpic,
  updateCalibrationSessionEpic,
  deleteCalibrationSessionEpic,
  startCalibrationSessionEpic,
  closeCalibrationSessionEpic,
  cancelCalibrationSessionEpic,
);
