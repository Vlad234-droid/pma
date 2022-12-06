// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { getCalibrationStatistics } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getCalibrationStatisticsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCalibrationStatistics.request)),
    mergeMap(({ payload }) =>
      //@ts-ignore
      from(api.getCalibrationStatistics(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }) => {
          if (!success) {
            return getCalibrationStatistics.failure(new Error(errors?.[0].message || undefined));
          }
          return getCalibrationStatistics.success(data);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getCalibrationStatistics.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      ),
    ),
  );

export default combineEpics(getCalibrationStatisticsEpic);
