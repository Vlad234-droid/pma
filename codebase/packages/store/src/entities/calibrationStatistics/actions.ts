import { createAction, createAsyncAction } from 'typesafe-actions';
import { RestResponseListRatingStatistic } from '@pma/openapi';

export const getCalibrationStatistics = createAsyncAction(
  'calibrationUsersStatistics/FETCH_REQUEST',
  'calibrationUsersStatistics/FETCH_SUCCESS',
  'calibrationUsersStatistics/FETCH_FAILURE',
)<any, RestResponseListRatingStatistic, Error>();

export const clearCalibrationStatistics = createAction('calibrationStatistics/CLEAR')<undefined>();

export const Actions = {
  getCalibrationStatistics: getCalibrationStatistics.request,
  clearCalibrationStatistics,
};
