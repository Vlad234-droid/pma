import { createAction, createAsyncAction } from 'typesafe-actions';
import { RestResponseMapStringTotalCount } from '@pma/openapi';

export const getCalibrationStatistics = createAsyncAction(
  'calibrationUsersStatistics/FETCH_REQUEST',
  'calibrationUsersStatistics/FETCH_SUCCESS',
  'calibrationUsersStatistics/FETCH_FAILURE',
)<any, RestResponseMapStringTotalCount, Error>();

export const clearCalibrationStatistics = createAction('calibrationStatistics/CLEAR')<undefined>();

export const Actions = {
  getCalibrationStatistics: getCalibrationStatistics.request,
  clearCalibrationStatistics,
};
