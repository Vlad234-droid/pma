// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getObjectivesReport } from './actions';

export const getObjectivesReportEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getObjectivesReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getObjectivesReport(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getObjectivesReport.success;
        }),
        catchError(({ errors }) => of(getObjectivesReport.failure(errors))),
      );
    }),
  );

export default combineEpics(getObjectivesReportEpic);
