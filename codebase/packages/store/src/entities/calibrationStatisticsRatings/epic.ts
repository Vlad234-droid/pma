// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { getCalibrationStatisticsRatings } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationStatisticsRatingsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCalibrationStatisticsRatings.request)),
    mergeMap(({ payload }) =>
      //@ts-ignore
      from(api.getCalibrationStatisticsRatings(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return getCalibrationStatisticsRatings.failure(new Error(errors?.[0].message || undefined));
          }
          return getCalibrationStatisticsRatings.success(data);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getCalibrationStatisticsRatings.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      ),
    ),
  );

export default combineEpics(getCalibrationStatisticsRatingsEpic);
