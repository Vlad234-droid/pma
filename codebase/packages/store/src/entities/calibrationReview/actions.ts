import { createAsyncAction } from 'typesafe-actions';

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

export const updateCalibrationReview = createAsyncAction(
  'calibration/review/UPDATE_REQUEST',
  'calibration/review/UPDATE_SUCCESS',
  'calibration/review/UPDATE_FAILURE',
  'calibration/review/UPDATE_CANCEL',
)<any, any, Error>();

export const Actions = {
  getCalibrationReview: getCalibrationReview.request,
  saveCalibrationReview: saveCalibrationReview.request,
  updateCalibrationReview: updateCalibrationReview.request,
};
