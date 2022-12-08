import { createAsyncAction, createAction } from 'typesafe-actions';
import { RestResponseListColleagueReview } from '@pma/openapi';

export const getUserCalibrationReviews = createAsyncAction(
  'calibrationUsersReviews/FETCH_REQUEST',
  'calibrationUsersReviews/FETCH_SUCCESS',
  'calibrationUsersReviews/FETCH_FAILURE',
)<any, { data: RestResponseListColleagueReview; rating: string }, Error>();

export const uploadCalibrationUsersReviews = createAsyncAction(
  'uploadCalibrationUsersReviews/FETCH_REQUEST',
  'uploadCalibrationUsersReviews/FETCH_SUCCESS',
  'uploadCalibrationUsersReviews/FETCH_FAILURE',
)<any, { data: RestResponseListColleagueReview; rating: string }, Error>();

export const clearCalibrationReviewsData = createAction('calibrationReviews/CLEAR')<undefined>();

export const Actions = {
  getUserCalibrationReviews: getUserCalibrationReviews.request,
  uploadCalibrationUsersReviews: uploadCalibrationUsersReviews.request,
  clearCalibrationReviewsData,
};
