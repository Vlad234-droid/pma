import { createAsyncAction, createAction } from 'typesafe-actions';

export const getObjectivesReport = createAsyncAction(
  'report/GET_OBJECTIVES_REPORT_REQUEST',
  'report/GET_OBJECTIVES_REPORT_SUCCESS',
  'report/GET_OBJECTIVES_REPORT_FAILURE',
)<any, any, Error>();

export const getLimitedObjectivesReport = createAsyncAction(
  'report/GET_LIMITED_OBJECTIVES_REPORT_REQUEST',
  'report/GET_LIMITED_OBJECTIVES_REPORT_SUCCESS',
  'report/GET_LIMITED_OBJECTIVES_REPORT_FAILURE',
)<any, any, Error>();

export const getObjectivesStatistics = createAsyncAction(
  'report/GET_OBJECTIVES_STATISTICS_REQUEST',
  'report/GET_OBJECTIVES_STATISTICS_SUCCESS',
  'report/GET_OBJECTIVES_STATISTICS_FAILURE',
)<any, any, Error>();

export const getTargetingColleagues = createAsyncAction(
  'report/GET_TARGETING_COLLEAGUES_REQUEST',
  'report/GET_TARGETING_COLLEAGUES_SUCCESS',
  'report/GET_TARGETING_COLLEAGUES_FAILURE',
)<any, any, Error>();

export const getTargetingFeedbacks = createAsyncAction(
  'report/GET_TARGETING_FEEDBACKS_COLLEAGUES_REQUEST',
  'report/GET_TARGETING_FEEDBACKS_COLLEAGUES_SUCCESS',
  'report/GET_TARGETING_FEEDBACKS_COLLEAGUES_FAILURE',
)<any, any, Error>();

export const clearStatistics = createAction('report/CLEAR_STATISTICS')();

export const Actions = {
  getObjectivesReport: getObjectivesReport.request,
  getTargetingColleagues: getTargetingColleagues.request,
  getObjectivesStatistics: getObjectivesStatistics.request,
  getLimitedObjectivesReport: getLimitedObjectivesReport.request,
  getTargetingFeedbacks: getTargetingFeedbacks.request,
  clearStatistics,
};
