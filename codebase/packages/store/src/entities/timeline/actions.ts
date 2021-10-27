import { createAsyncAction } from 'typesafe-actions';

export const getTimeline = createAsyncAction(
  'timeline/REQUEST',
  'timeline/SUCCESS',
  'timeline/FAILURE',
  'timeline/CANCEL',
)<undefined, any, Error, undefined>();

export const Actions = {
  getTimeline: getTimeline.request,
};
