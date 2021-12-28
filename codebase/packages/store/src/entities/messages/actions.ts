import { createAsyncAction } from 'typesafe-actions';

export const getMessages = createAsyncAction(
  'messages/GET_MESSAGES_REQUEST',
  'messages/GET_MESSAGES_SUCCESS',
  'messages/GET_MESSAGES_FAILURE',
  'messages/GET_MESSAGES_CANCEL',
)<any, any, Error, undefined>();

export const getMessagesCount = createAsyncAction(
  'messages/GET_MESSAGES_COUNT_REQUEST',
  'messages/GET_MESSAGES_COUNT_SUCCESS',
  'messages/GET_MESSAGES_COUNT_FAILURE',
  'messages/GET_MESSAGES_COUNT_CANCEL',
)<any, any, Error, undefined>();

export const updateMessage = createAsyncAction(
  'messages/UPDATE_MESSAGE_REQUEST',
  'messages/UPDATE_MESSAGE_SUCCESS',
  'messages/UPDATE_MESSAGE_FAILURE',
  'messages/UPDATE_MESSAGE_CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getMessages: getMessages.request,
  getMessagesCount: getMessagesCount.request,
  updateMessage: updateMessage.request,
};
