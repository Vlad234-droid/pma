import { createAsyncAction } from 'typesafe-actions';
import { FileApiDelete1Request } from '@pma/openapi';

export const getPreviousReviewFiles = createAsyncAction(
  'previousReviewFiles/REQUEST',
  'previousReviewFiles/SUCCESS',
  'previousReviewFiles/FAILURE',
  'previousReviewFiles/CANCEL',
)<any, any, Error, undefined>();

export const uploadFile = createAsyncAction(
  'previousReviewFiles/UPLOAD_REQUEST',
  'previousReviewFiles/UPLOAD_SUCCESS',
  'previousReviewFiles/UPLOAD_FAILURE',
  'previousReviewFiles/UPLOAD_CANCEL',
)<any, any, Error, undefined>();

export const deleteFile = createAsyncAction(
  'previousReviewFiles/DELETE_REQUEST',
  'previousReviewFiles/DELETE_SUCCESS',
  'previousReviewFiles/DELETE_FAILURE',
  'previousReviewFiles/DELETE_CANCEL',
)<FileApiDelete1Request & { colleagueUUID?: string; reviewUUID?: string }, undefined, Error, undefined>();

export const Actions = {
  getPreviousReviewFiles: getPreviousReviewFiles.request,
  uploadFile: uploadFile.request,
  deleteFile: deleteFile.request,
};
