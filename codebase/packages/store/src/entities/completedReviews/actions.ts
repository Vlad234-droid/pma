import { createAsyncAction } from 'typesafe-actions';

export const getCompletedReviews = createAsyncAction(
  'COMPLETED_REVIEWS/FETCH_REQUEST',
  'COMPLETED_REVIEWS/FETCH_SUCCESS',
  'COMPLETED_REVIEWS/FETCH_FAILURE',
  'COMPLETED_REVIEWS/FETCH_CANCEL',
)<{ colleagueUuid?: string }, any, Error>();

export const Actions = {
  getCompletedReviews: getCompletedReviews.request,
};
