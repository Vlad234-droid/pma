// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
  getStatisticsReview,
  getOverallRatingsStatistics,
  getNewToBusinessStatistics,
  getFeedbacksStatistics,
  getAnniversaryReviewsStatistics,
  getLeadershipReviewsStatistics,
} from './actions';

export const getStatisticsReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getStatisticsReview.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleaguesReview(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getStatisticsReview.success(data.data);
        }),
        catchError(({ errors }) => of(getStatisticsReview.failure(errors))),
      );
    }),
  );

export const getOverallRatingsStatisticsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getOverallRatingsStatistics.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleaguesOverallRatings(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getOverallRatingsStatistics.success(data.data);
        }),
        catchError(({ errors }) => of(getOverallRatingsStatistics.failure(errors))),
      );
    }),
  );

export const getFeedbacksStatisticsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getFeedbacksStatistics.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleaguesFeedbacks(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getFeedbacksStatistics.success(data.data);
        }),
        catchError(({ errors }) => of(getFeedbacksStatistics.failure(errors))),
      );
    }),
  );

export const getNewToBusinessStatisticsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getNewToBusinessStatistics.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleaguesNewToBusiness(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getNewToBusinessStatistics.success(data.data);
        }),
        catchError(({ errors }) => of(getNewToBusinessStatistics.failure(errors))),
      );
    }),
  );

export const getAnniversaryReviewsStatisticsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getAnniversaryReviewsStatistics.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleaguesAnniversaryReviews(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getAnniversaryReviewsStatistics.success(data.data);
        }),
        catchError(({ errors }) => of(getAnniversaryReviewsStatistics.failure(errors))),
      );
    }),
  );

export const getLeadershipReviewsStatisticsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getLeadershipReviewsStatistics.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getColleaguesLeadershipReviews(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          //@ts-ignore
          return getLeadershipReviewsStatistics.success(data.data);
        }),
        catchError(({ errors }) => of(getLeadershipReviewsStatistics.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getStatisticsReviewEpic,
  getOverallRatingsStatisticsEpic,
  getFeedbacksStatisticsEpic,
  getNewToBusinessStatisticsEpic,
  getAnniversaryReviewsStatisticsEpic,
  getLeadershipReviewsStatisticsEpic,
);
