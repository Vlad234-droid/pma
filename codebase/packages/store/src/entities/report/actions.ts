import { createAsyncAction, createAction } from 'typesafe-actions';

export const getLimitedObjectivesReport = createAsyncAction(
  'report/GET_LIMITED_OBJECTIVES_REPORT_REQUEST',
  'report/GET_LIMITED_OBJECTIVES_REPORT_SUCCESS',
  'report/GET_LIMITED_OBJECTIVES_REPORT_FAILURE',
)<any, any, Error>();

export const getReviewReport = createAsyncAction(
  'report/statistics-review/REQUEST',
  'report/statistics-review/SUCCESS',
  'report/statistics-review/FAILURE',
)<any, any, Error>();

export const getOverallRatingsReport = createAsyncAction(
  'report/overall-ratings/REQUEST',
  'report/overall-ratings/SUCCESS',
  'report/overall-ratings/FAILURE',
)<any, any, Error>();

export const getNewToBusinessReport = createAsyncAction(
  'report/statistics-new-to-business/REQUEST',
  'report/statistics-new-to-business/SUCCESS',
  'report/statistics-new-to-business/FAILURE',
)<any, any, Error>();

export const getFeedbacksReport = createAsyncAction(
  'report/statistics-feedbacks/REQUEST',
  'report/statistics-feedbacks/SUCCESS',
  'report/statistics-feedbacks/FAILURE',
)<any, any, Error>();

export const getAnniversaryReviewsReport = createAsyncAction(
  'report/statistics-anniversary-reviews/REQUEST',
  'report/statistics-anniversary-reviews/SUCCESS',
  'report/statistics-anniversary-reviews/FAILURE',
)<any, any, Error>();

export const getLeadershipReviewsReport = createAsyncAction(
  'report/statistics-leadership-reviews/REQUEST',
  'report/statistics-leadership-reviews/SUCCESS',
  'report/statistics-leadership-reviews/FAILURE',
)<any, any, Error>();

export const clearStatistics = createAction('report/CLEAR_STATISTICS')();

export const Actions = {
  getReviewReport: getReviewReport.request,
  getOverallRatingsReport: getOverallRatingsReport.request,
  getNewToBusinessReport: getNewToBusinessReport.request,
  getFeedbacksReport: getFeedbacksReport.request,
  getAnniversaryReviewsReport: getAnniversaryReviewsReport.request,
  getLeadershipReviewsReport: getLeadershipReviewsReport.request,
  getLimitedObjectivesReport: getLimitedObjectivesReport.request,
  clearStatistics,
};
