import { createAsyncAction } from 'typesafe-actions';

export const getCalibrationUsersReviews = createAsyncAction(
  'calibrationUsersReviews/FETCH_REQUEST',
  'calibrationUsersReviews/FETCH_SUCCESS',
  'calibrationUsersReviews/FETCH_FAILURE',
)<any, any, Error>();

export const Actions = {
  getCalibrationUsersReviews: getCalibrationUsersReviews.request,
};
