import { createAsyncAction } from 'typesafe-actions';

export const getTimeline = createAsyncAction(
  'timeline/REQUEST',
  'timeline/SUCCESS',
  'timeline/FAILURE',
  'timeline/CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getTimeline: getTimeline.request,
};
