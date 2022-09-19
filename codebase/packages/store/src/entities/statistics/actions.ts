import { createAsyncAction, createAction } from 'typesafe-actions';

export const getStatisticsReview = createAsyncAction(
  'statistics/statistics-review/REQUEST',
  'statistics/statistics-review/SUCCESS',
  'statistics/statistics-review/FAILURE',
)<any, any, Error>();

export const getOverallRatingsStatistics = createAsyncAction(
  'statistics/overall-ratings/REQUEST',
  'statistics/overall-ratings/SUCCESS',
  'statistics/overall-ratings/FAILURE',
)<any, any, Error>();

export const getNewToBusinessStatistics = createAsyncAction(
  'statistics/statistics-new-to-business/REQUEST',
  'statistics/statistics-new-to-business/SUCCESS',
  'statistics/statistics-new-to-business/FAILURE',
)<any, any, Error>();

export const getFeedbacksStatistics = createAsyncAction(
  'statistics/statistics-feedbacks/REQUEST',
  'statistics/statistics-feedbacks/SUCCESS',
  'statistics/statistics-feedbacks/FAILURE',
)<any, any, Error>();

export const getAnniversaryReviewsStatistics = createAsyncAction(
  'statistics/statistics-anniversary-reviews/REQUEST',
  'statistics/statistics-anniversary-reviews/SUCCESS',
  'statistics/statistics-anniversary-reviews/FAILURE',
)<any, any, Error>();

export const getLeadershipReviewsStatistics = createAsyncAction(
  'statistics/statistics-leadership-reviews/REQUEST',
  'statistics/statistics-leadership-reviews/SUCCESS',
  'statistics/statistics-leadership-reviews/FAILURE',
)<any, any, Error>();

export const clearStatistics = createAction('statistics/CLEAR_STATISTICS')();

export const Actions = {
  getStatisticsReview: getStatisticsReview.request,
  getOverallRatingsStatistics: getOverallRatingsStatistics.request,
  getNewToBusinessStatistics: getNewToBusinessStatistics.request,
  getFeedbacksStatistics: getFeedbacksStatistics.request,
  getAnniversaryReviewsStatistics: getAnniversaryReviewsStatistics.request,
  getLeadershipReviewsStatistics: getLeadershipReviewsStatistics.request,
  clearStatistics: clearStatistics,
};
