import { createAsyncAction } from 'typesafe-actions';

export const getManagerReviews = createAsyncAction(
  'managers/REQUEST',
  'managers/SUCCESS',
  'managers/FAILURE',
  'managers/CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getManagerReviews: getManagerReviews.request,
};
