import { createAsyncAction } from 'typesafe-actions';

export const getAllTips = createAsyncAction(
  'tips/GET_ALL_REQUEST',
  'tips/GET_ALL_SUCCESS',
  'tips/GET_ALL_FAILURE',
)<any, any, Error>();

export const Actions = {
  getAllTips: getAllTips.request,
};