// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { getCalibrationUsersReviews, uploadCalibrationUsersReviews } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationUsersReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCalibrationUsersReviews.request)),
    mergeMap(({ payload: { params, rating } }) =>
      from(api.getCalibrationUsersReviews(params)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return getCalibrationUsersReviews.failure(new Error(errors?.[0].message || undefined));
          }
          return getCalibrationUsersReviews.success({ data, rating });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getCalibrationUsersReviews.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      ),
    ),
  );
export const uploadCalibrationUsersReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadCalibrationUsersReviews.request)),
    mergeMap(({ payload: { params, rating } }) =>
      from(api.uploadCalibrationUsersReviews(params)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return uploadCalibrationUsersReviews.failure(new Error(errors?.[0].message || undefined));
          }
          return uploadCalibrationUsersReviews.success({ data, rating });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(uploadCalibrationUsersReviews.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      ),
    ),
  );

export default combineEpics(getCalibrationUsersReviewsEpic, uploadCalibrationUsersReviewsEpic);
