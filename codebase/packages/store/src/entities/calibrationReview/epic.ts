// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import {
  saveCalibrationReview,
  getCalibrationReview,
  updateCalibrationReview,
  saveCalibrationSessionReview,
} from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCalibrationReview.request)),
    switchMap(({ payload }) => {
      const { colleagueUuid } = payload;
      //@ts-ignore
      return from(api.getCalibrationReviews(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return getCalibrationReview.failure(new Error(errors?.[0].message || undefined));
          }
          return getCalibrationReview.success({ [colleagueUuid]: data });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getCalibrationReview.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getCalibrationReview.cancel)))),
      );
    }),
  );

export const saveCalibrationReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(saveCalibrationReview.request)),
    switchMap(({ payload }) => {
      const { data, ...rest } = payload;
      const { colleagueUuid } = rest;
      //@ts-ignore
      return from(api.createCalibrationReview(rest, data)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return saveCalibrationReview.failure(new Error(errors?.[0].message || undefined));
          }
          return saveCalibrationReview.success({ [colleagueUuid]: data });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(saveCalibrationReview.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(saveCalibrationReview.cancel)))),
      );
    }),
  );

export const saveCalibrationSessionReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(saveCalibrationSessionReview.request)),
    switchMap(({ payload }) => {
      const { data, ...rest } = payload;
      const { colleagueUuid } = rest;
      //@ts-ignore
      return from(api.createCalibrationSessionReview(rest, data)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return saveCalibrationSessionReview.failure(new Error(errors?.[0].message || undefined));
          }
          return saveCalibrationSessionReview.success({ [colleagueUuid]: data });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(saveCalibrationSessionReview.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(saveCalibrationSessionReview.cancel)))),
      );
    }),
  );

export const updateCalibrationReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateCalibrationReview.request)),
    switchMap(({ payload }) => {
      const { data, ...rest } = payload;
      const { colleagueUuid } = rest;
      //@ts-ignore
      return from(api.updateCalibrationReview(rest, data)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return updateCalibrationReview.failure(new Error(errors?.[0].message || undefined));
          }
          return updateCalibrationReview.success({ [colleagueUuid]: data });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(updateCalibrationReview.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(updateCalibrationReview.cancel)))),
      );
    }),
  );

export default combineEpics(
  getCalibrationReviewEpic,
  saveCalibrationReviewEpic,
  updateCalibrationReviewEpic,
  saveCalibrationSessionReviewEpic,
);
