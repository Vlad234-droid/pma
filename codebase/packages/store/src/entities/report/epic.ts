//@ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
  getLeadershipReviewsReport,
  getAnniversaryReviewsReport,
  getFeedbacksReport,
  getNewToBusinessReport,
  getReviewReport,
  getOverallRatingsReport,
  getReportsTotalColleagues,
} from './actions';

export const getLeadershipReviewsReportEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getLeadershipReviewsReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getLeadershipReviewsStatistics(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getLeadershipReviewsReport.success(data);
        }),
        catchError(({ errors }) => of(getLeadershipReviewsReport.failure(errors))),
      );
    }),
  );
export const getReportsTotalColleaguesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getReportsTotalColleagues.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getReportsTotalColleagues(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getReportsTotalColleagues.success(data);
        }),
        catchError(({ errors }) => of(getReportsTotalColleagues.failure(errors))),
      );
    }),
  );

export const getAnniversaryReviewsReportEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getAnniversaryReviewsReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getAnniversaryReviewsStatistics(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getAnniversaryReviewsReport.success(data);
        }),
        catchError(({ errors }) => of(getAnniversaryReviewsReport.failure(errors))),
      );
    }),
  );

export const getFeedbacksReportEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getFeedbacksReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getFeedbacksStatistics(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getFeedbacksReport.success(data);
        }),
        catchError(({ errors }) => of(getFeedbacksReport.failure(errors))),
      );
    }),
  );

export const getNewToBusinessReportEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getNewToBusinessReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getNewToBusinessStatistics(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getNewToBusinessReport.success(data);
        }),
        catchError(({ errors }) => of(getNewToBusinessReport.failure(errors))),
      );
    }),
  );

export const getStatisticsReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getReviewReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getReviewStatistics(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getReviewReport.success(data);
        }),
        catchError(({ errors }) => of(getReviewReport.failure(errors))),
      );
    }),
  );

export const getOverallRatingsReportEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getOverallRatingsReport.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getOverallRatingsStatistics(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getOverallRatingsReport.success(data);
        }),
        catchError(({ errors }) => of(getOverallRatingsReport.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getLeadershipReviewsReportEpic,
  getAnniversaryReviewsReportEpic,
  getFeedbacksReportEpic,
  getNewToBusinessReportEpic,
  getStatisticsReviewEpic,
  getOverallRatingsReportEpic,
  getReportsTotalColleaguesEpic,
);
