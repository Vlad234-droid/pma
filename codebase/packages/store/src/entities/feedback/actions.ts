import { createAsyncAction } from 'typesafe-actions';

export const createNewFeedback = createAsyncAction('feedback/REQUEST', 'feedback/SUCCESS', 'feedback/FAILURE')<
  any,
  any,
  Error
>();
export const getAllFeedbacks = createAsyncAction(
  'feedback/GET_ALL_REQUEST',
  'feedback/GET_ALL_SUCCESS',
  'feedback/GET_ALL_FAILURE',
)<any, any, Error>();

export const readFeedback = createAsyncAction(
  'feedback/READ_REQUEST',
  'feedback/READ_SUCCESS',
  'feedback/READ_FAILURE',
)<any, any, Error>();

export const updatedFeedback = createAsyncAction(
  'feedback/updatedFeedback_REQUEST',
  'feedback/updatedFeedback_SUCCESS',
  'feedback/updatedFeedback_FAILURE',
)<any, any, Error>();

export const getObjectiveReviews = createAsyncAction(
  'feedback/getObjectiveReviews_REQUEST',
  'feedback/getObjectiveReviews_SUCCESS',
  'feedback/getObjectiveReviews_FAILURE',
)<any, any, Error>();

export const Actions = {
  createNewFeedback: createNewFeedback.request,
  getAllFeedbacks: getAllFeedbacks.request,
  readFeedback: readFeedback.request,
  updatedFeedback: updatedFeedback.request,
  getObjectiveReviews: getObjectiveReviews.request,
};
