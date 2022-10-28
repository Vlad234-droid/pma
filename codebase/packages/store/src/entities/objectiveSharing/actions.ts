import { ShareColleagueReviewsParams, GetAllSharedColleagueReviewsParams } from '@pma/api';
import { createAsyncAction, createAction } from 'typesafe-actions';

export const startSharing = createAsyncAction(
  'sharing/START_SHARING_REQUEST',
  'sharing/START_SHARING_SUCCESS',
  'sharing/START_SHARING_FAILURE',
)<ShareColleagueReviewsParams, any, Error>();

export const stopSharing = createAsyncAction(
  'sharing/STOP_SHARING_REQUEST',
  'sharing/STOP_SHARING_SUCCESS',
  'sharing/STOP_SHARING_FAILURE',
)<ShareColleagueReviewsParams, any, Error>();

export const getSharings = createAsyncAction(
  'sharing/GET_SHARINGS_REQUEST',
  'sharing/GET_SHARINGS_SUCCESS',
  'sharing/GET_SHARINGS_FAILURE',
)<GetAllSharedColleagueReviewsParams, any, Error>();

export const checkSharing = createAsyncAction(
  'sharing/CHECK_SHARING_REQUEST',
  'sharing/CHECK_SHARING_SUCCESS',
  'sharing/CHECK_SHARING_FAILURE',
)<ShareColleagueReviewsParams, any, Error>();

export const clearGettedCollegues = createAction('collegues/CLEAR')<undefined>();

export const Actions = {
  startSharing: startSharing.request,
  stopSharing: stopSharing.request,
  getSharings: getSharings.request,
  checkSharing: checkSharing.request,
};
