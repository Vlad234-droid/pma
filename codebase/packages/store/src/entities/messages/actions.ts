import { createAsyncAction } from 'typesafe-actions';

export const getMessagesCount = createAsyncAction(
  'messages/GET_MESSAGES_COUNT_REQUEST',
  'messages/GET_MESSAGES_COUNT_SUCCESS',
  'messages/GET_MESSAGES_COUNT_FAILURE',
  'messages/GET_MESSAGES_COUNT_CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getMessagesCount: getMessagesCount.request,
};
