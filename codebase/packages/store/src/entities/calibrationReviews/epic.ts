// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { getCalibrationUsersReviews } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationUsersReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCalibrationUsersReviews.request)),
    mergeMap(({ payload: { params, type } }) =>
      from(api.getCalibrationUsersReviews(params)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return getCalibrationUsersReviews.failure(new Error(errors?.[0].message || undefined));
          }
          return getCalibrationUsersReviews.success({ reviews: data, type: type });
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

export default combineEpics(getCalibrationUsersReviewsEpic);
