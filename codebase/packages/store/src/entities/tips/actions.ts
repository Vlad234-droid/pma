import { createAsyncAction } from 'typesafe-actions';

export const getAllTips = createAsyncAction('tips/GET_ALL_REQUEST', 'tips/GET_ALL_SUCCESS', 'tips/GET_ALL_FAILURE')<
  any,
  any,
  Error
>();

export const getTipHistory = createAsyncAction(
  'tips/GET_HISTORY_REQUEST',
  'tips/GET_HISTORY_SUCCESS',
  'tips/GET_HISTORY_FAILURE',
)<any, any, Error>();

export const createTip = createAsyncAction('tips/CREATE_REQUEST', 'tips/CREATE_SUCCESS', 'tips/CREATE_FAILURE')<
  any,
  any,
  Error
>();

export const getTipByUuid = createAsyncAction(
  'tips/GET_BY_UUID_REQUEST',
  'tips/GET_BY_UUID_SUCCESS',
  'tips/GET_BY_UUID_FAILURE',
)<any, any, Error>();

export const deleteTip = createAsyncAction('tips/DELETE_REQUEST', 'tips/DELETE_SUCCESS', 'tips/DELETE_FAILURE')<
  any,
  any,
  Error
>();

export const publishTipByUuid = createAsyncAction(
  'tips/PUBLISH_BY_UUID_REQUEST',
  'tips/PUBLISH_BY_UUID_SUCCESS',
  'tips/PUBLISH_BY_UUID_FAILURE',
)<any, any, Error>();

export const Actions = {
  getAllTips: getAllTips.request,
  getTipHistory: getTipHistory.request,
  createTip: createTip.request,
  getTipByUuid: getTipByUuid.request,
  deleteTip: deleteTip.request,
  publishTip: publishTipByUuid.request,
};
