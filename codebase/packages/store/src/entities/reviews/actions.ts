import { createAction, createAsyncAction } from 'typesafe-actions';
import { ReviewActionParams, ActionParams } from '@pma/client/src/config/interface';
import { ReviewType, Status } from '@pma/client/src/config/enum';
import { Review } from '@pma/client/src/config/types';

interface ReviewUpdateStatusAction extends ActionParams {
  pathParams: { colleagueUuid: string; approverUuid: string; code?: string; cycleUuid?: string; status?: Status };
  data: {
    reason?: string;
    reviews?: Review[];
    status?: Status;
    colleagueUuid?: string;
  };
}

interface ReviewUpdateMultipartAction extends ReviewActionParams {
  files?: File[];
  metadata?: object;
}

export const getReview = createAsyncAction(
  'reviews/FETCH_REQUEST',
  'reviews/FETCH_SUCCESS',
  'reviews/FETCH_FAILURE',
  'reviews/FETCH_CANCEL',
)<ReviewActionParams, any, Error>();

export const getReviews = createAsyncAction(
  'reviews/FETCH_ALL_REQUEST',
  'reviews/FETCH_ALL_SUCCESS',
  'reviews/FETCH_ALL_FAILURE',
  'reviews/FETCH_ALL_CANCEL',
)<ReviewActionParams, any, Error>();

export const getColleagueReviews = createAsyncAction(
  'reviews/colleague/FETCH_ALL_REQUEST',
  'reviews/colleague/FETCH_ALL_SUCCESS',
  'reviews/colleague/FETCH_ALL_FAILURE',
  'reviews/colleague/FETCH_ALL_CANCEL',
)<ReviewActionParams, any, Error>();

export const createReview = createAsyncAction(
  'reviews/CREATE_REQUEST',
  'reviews/CREATE_SUCCESS',
  'reviews/CREATE_FAILURE',
)<ReviewActionParams, any, Error>();

export const deleteReview = createAsyncAction(
  'reviews/DELETE_REQUEST',
  'reviews/DELETE_SUCCESS',
  'reviews/DELETE_FAILURE',
  'reviews/DELETE_CANCEL',
)<ReviewActionParams, any, Error>();

export const updateReview = createAsyncAction(
  'reviews/UPDATE_REQUEST',
  'reviews/UPDATE_SUCCESS',
  'reviews/UPDATE_FAILURE',
  'reviews/UPDATE_CANCEL',
)<ReviewActionParams, any, Error>();

export const updateReviewStatus = createAsyncAction(
  'reviews/UPDATE_STATUS_REQUEST',
  'reviews/UPDATE_STATUS_SUCCESS',
  'reviews/UPDATE_STATUS_FAILURE',
  'reviews/UPDATE_STATUS_CANCEL',
)<ReviewUpdateStatusAction, any, Error>();

export const approveReview = createAsyncAction(
  'reviews/APPROVE_REQUEST',
  'reviews/APPROVE_SUCCESS',
  'reviews/APPROVE_FAILURE',
  'reviews/APPROVE_CANCEL',
)<ReviewActionParams, any, Error>();

export const declineReview = createAsyncAction(
  'reviews/DECLINE_REQUEST',
  'reviews/DECLINE_SUCCESS',
  'reviews/DECLINE_FAILURE',
  'reviews/DECLINE_CANCEL',
)<ReviewActionParams, any, Error>();

export const updateReviews = createAsyncAction(
  'reviews/UPDATE_ALL_REQUEST',
  'reviews/UPDATE_ALL_SUCCESS',
  'reviews/UPDATE_ALL_FAILURE',
  'reviews/UPDATE_ALL_CANCEL',
)<ReviewUpdateMultipartAction, any, Error>();

export const getReviewByUuid = createAsyncAction(
  'objectives/getReviewByUuid_REQUEST',
  'objectives/getReviewByUuid_SUCCESS',
  'objectives/getReviewByUuid_FAILURE',
  'objectives/UPDATE_ALL_CANCEL',
)<any, any, Error>();

export const updateRatingReview = createAsyncAction(
  'reviews/rating/UPDATE_REQUEST',
  'reviews/rating/UPDATE_SUCCESS',
  'reviews/rating/UPDATE_FAILURE',
  'reviews/rating/UPDATE_CANCEL',
)<{ type: ReviewType; number: number; fields: any }, any, Error, undefined>();

export const updateReviewsState = createAction('reviews/UPDATE_ALL_STATE')<any, any>();

export const clearReviewData = createAction('reviews/CLEAR')<undefined>();

export const Actions = {
  getReview: getReview.request,
  getReviews: getReviews.request,
  getColleagueReviews: getColleagueReviews.request,
  createReview: createReview.request,
  deleteReview: deleteReview.request,
  updateReview: updateReview.request,
  updateReviews: updateReviews.request,
  updateReviewStatus: updateReviewStatus.request,
  approveReview: approveReview.request,
  declineReview: declineReview.request,
  getReviewByUuid: getReviewByUuid.request,
  updateRatingReview: updateRatingReview.request,
  updateReviewsState,
  clearReviewData,
};
