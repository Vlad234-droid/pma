import { createAction, createAsyncAction } from 'typesafe-actions';
import { RestResponseMapStringTotalCount } from '@pma/openapi';

export const getCalibrationStatisticsRatings = createAsyncAction(
  'calibrationUsersStatisticsRatings/FETCH_REQUEST',
  'calibrationUsersStatisticsRatings/FETCH_SUCCESS',
  'calibrationUsersStatisticsRatings/FETCH_FAILURE',
)<any, RestResponseMapStringTotalCount, Error>();

export const clearCalibrationStatisticsRatings = createAction('calibrationStatisticsRatings/CLEAR')<undefined>();

export const Actions = {
  getCalibrationStatisticsRatings: getCalibrationStatisticsRatings.request,
  clearCalibrationStatisticsRatings,
};
