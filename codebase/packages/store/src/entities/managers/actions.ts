import { createAsyncAction } from 'typesafe-actions';

export const getManagerReviews = createAsyncAction(
  'managers/reviews/REQUEST',
  'managers/reviews/SUCCESS',
  'managers/reviews/FAILURE',
  'managers/reviews/CANCEL',
)<any, any, Error, undefined>();

export const getManagerCalibrations = createAsyncAction(
  'managers/calibrations/REQUEST',
  'managers/calibrations/SUCCESS',
  'managers/calibrations/FAILURE',
  'managers/calibrations/CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getManagerReviews: getManagerReviews.request,
  getManagerCalibrations: getManagerCalibrations.request,
};
