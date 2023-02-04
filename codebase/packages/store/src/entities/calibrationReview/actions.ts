import { createAsyncAction, createAction } from 'typesafe-actions';
import { initialState } from './reducer';

export const getCalibrationReview = createAsyncAction(
  'calibration/review/GET_REQUEST',
  'calibration/review/GET_SUCCESS',
  'calibration/review/GET_FAILURE',
  'calibration/review/GET_CANCEL',
)<any, any, Error>();

export const saveCalibrationReview = createAsyncAction(
  'calibration/review/SAVE_REQUEST',
  'calibration/review/SAVE_SUCCESS',
  'calibration/review/SAVE_FAILURE',
  'calibration/review/SAVE_CANCEL',
)<any, any, Error>();

export const saveCalibrationSessionReview = createAsyncAction(
  'calibration-session/review/SAVE_REQUEST',
  'calibration-session/review/SAVE_SUCCESS',
  'calibration-session/review/SAVE_FAILURE',
  'calibration-session/review/SAVE_CANCEL',
)<any, any, Error>();

export const updateCalibrationReview = createAsyncAction(
  'calibration/review/UPDATE_REQUEST',
  'calibration/review/UPDATE_SUCCESS',
  'calibration/review/UPDATE_FAILURE',
  'calibration/review/UPDATE_CANCEL',
)<any, any, Error>();

export const clearCalibrationReview = createAction('calibration/review-rating/CLEAR')<undefined>();

export const changeCalibrationReviewMeta = createAction('calibration/review-rating/CLEAR')<
  Partial<typeof initialState.meta>
>();

export const Actions = {
  getCalibrationReview: getCalibrationReview.request,
  saveCalibrationReview: saveCalibrationReview.request,
  updateCalibrationReview: updateCalibrationReview.request,
  saveCalibrationSessionReview: saveCalibrationSessionReview.request,
  changeCalibrationReviewMeta,
  clearCalibrationReview,
};
