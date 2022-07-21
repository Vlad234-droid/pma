import { createAsyncAction } from 'typesafe-actions';

export const getTimeline = createAsyncAction(
  'timeline/REQUEST',
  'timeline/SUCCESS',
  'timeline/FAILURE',
  'timeline/CANCEL',
)<any, any, Error, undefined>();

export const getUserTimeline = createAsyncAction(
  'user_timeline/REQUEST',
  'user_timeline/SUCCESS',
  'user_timeline/FAILURE',
  'user_timeline/CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getTimeline: getTimeline.request,
  getUserTimeline: getUserTimeline.request,
};
