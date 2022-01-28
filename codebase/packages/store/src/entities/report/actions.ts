import { createAsyncAction } from 'typesafe-actions';

export const getObjectivesReport = createAsyncAction(
  'report/GET_OBJECTIVES_REPORT_REQUEST',
  'report/GET_OBJECTIVES_REPORT_SUCCESS',
  'report/GET_OBJECTIVES_REPORT_FAILURE',
)<any, any, Error>();

export const Actions = {
  getObjectivesReport: getObjectivesReport.request,
};
