import { createAsyncAction } from 'typesafe-actions';

export const getAllTips = createAsyncAction(
  'tips/GET_ALL_REQUEST',
  'tips/GET_ALL_SUCCESS',
  'tips/GET_ALL_FAILURE',
)<any, any, Error>();

export const getTipHistory = createAsyncAction(
  'tips/GET_HISTORY_REQUEST',
  'tips/GET_HISTORY_SUCCESS',
  'tips/GET_HISTORY_FAILURE',
)<any, any, Error>();

export const Actions = {
  getAllTips: getAllTips.request,
  getTipHistory: getTipHistory.request,
};