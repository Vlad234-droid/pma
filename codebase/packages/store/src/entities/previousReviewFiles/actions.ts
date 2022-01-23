import { createAsyncAction } from 'typesafe-actions';

export const getPreviousReviewFiles = createAsyncAction(
  'previousReviewFiles/REQUEST',
  'previousReviewFiles/SUCCESS',
  'previousReviewFiles/FAILURE',
  'previousReviewFiles/CANCEL',
)<undefined, any, Error, undefined>();

export const uploadFile = createAsyncAction(
  'previousReviewFiles/DOWNLOAD_REQUEST',
  'previousReviewFiles/DOWNLOAD_SUCCESS',
  'previousReviewFiles/DOWNLOAD_FAILURE',
  'previousReviewFiles/DOWNLOAD_CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getPreviousReviewFiles: getPreviousReviewFiles.request,
  uploadFile: uploadFile.request,
};
