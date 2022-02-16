// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getObjectivesReport, getObjectivesStatistics } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getObjectivesReportEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getObjectivesReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getObjectivesReport(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getObjectivesReport.success(data.data);
        }),
        catchError(({ errors }) => of(getObjectivesReport.failure(errors))),
      );
    }),
  );

export const getObjectivesStatisticsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getObjectivesStatistics.request)),
    switchMap(({ payload }) => {
      return from(api.getObjectivesStatistics(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getObjectivesStatistics.success(data);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getObjectivesStatistics.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Objectives statistics fetch error' }),
          );
        }),
      );
    }),
  );

export default combineEpics(getObjectivesReportEpic, getObjectivesStatisticsEpic);
