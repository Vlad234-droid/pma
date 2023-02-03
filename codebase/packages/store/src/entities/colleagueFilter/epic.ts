// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { RestResponseColleagueFilterOptions } from '@pma/openapi';
import { getColleagueFilter, getReportingFilters } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

import CODES from '../../utils/errorCode.json';

export const getCalibrationFilterEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagueFilter.request)),
    switchMap(({ payload }) =>
      from(api.getCalibrationFilter(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseColleagueFilterOptions) => {
          if (!success) {
            return getColleagueFilter.failure(new Error(errors?.[0].message || undefined));
          }
          return getColleagueFilter.success({ data: data || {} });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          const { code, message } = errors?.[0];
          const errorMessage = CODES[code] || message;
          return concatWithErrorToast(
            of(getColleagueFilter.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errorMessage, message: '' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getColleagueFilter.cancel)))),
      ),
    ),
  );
export const getReportingFiltersEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getReportingFilters.request)),
    switchMap(({ payload }) =>
      from(api.getReportingFilters(payload)).pipe(
        //@ts-ignore
        map(({ success, data, errors }: RestResponseColleagueFilterOptions) => {
          if (!success) {
            return getReportingFilters.failure(new Error(errors?.[0].message || undefined));
          }
          return getReportingFilters.success({ data: data || {} });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          const { code, message } = errors?.[0];
          const errorMessage = CODES[code] || message;

          return concatWithErrorToast(
            of(getReportingFilters.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errorMessage, message: '' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getReportingFilters.cancel)))),
      ),
    ),
  );

export default combineEpics(getCalibrationFilterEpic, getReportingFiltersEpic);
