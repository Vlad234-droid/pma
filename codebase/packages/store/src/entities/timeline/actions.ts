import { createAsyncAction } from 'typesafe-actions';
import { RequestPayload, SuccessPayload, ErrorPayload, CancelPayload } from './types';

export const getTimeline = createAsyncAction(
  'timeline/REQUEST',
  'timeline/SUCCESS',
  'timeline/FAILURE',
  'timeline/CANCEL',
)<RequestPayload, SuccessPayload, ErrorPayload, CancelPayload>();

export const getUserTimeline = createAsyncAction(
  'user_timeline/REQUEST',
  'user_timeline/SUCCESS',
  'user_timeline/FAILURE',
  'user_timeline/CANCEL',
)<RequestPayload, SuccessPayload, ErrorPayload, CancelPayload>();

export const Actions = {
  getTimeline: getTimeline.request,
  getUserTimeline: getUserTimeline.request,
};
