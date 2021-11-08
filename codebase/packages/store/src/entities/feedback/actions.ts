import { createAsyncAction } from 'typesafe-actions';

export const createNewFeedback = createAsyncAction(
  'user/current/REQUEST',
  'user/current/SUCCESS',
  'user/current/FAILURE',
)<any, any, Error>();

export const Actions = {
  createNewFeedback: createNewFeedback.request,
};
