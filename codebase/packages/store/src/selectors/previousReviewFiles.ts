//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const previousReviewFilesMetaSelector = (state: RootState) => state.previousReviewFiles.meta;

export const isDeleteFileSuccess = (state: RootState) =>
  state.previousReviewFiles.deleteFileMeta.loaded && !state.previousReviewFiles.deleteFileMeta.error;

export const isDeleteFileLoaded = (state: RootState) => state.previousReviewFiles.deleteFileMeta.loaded;

export const getPreviousReviewFilesSelector = (reviewUUID = 'previousReviewFiles') =>
  createSelector(
    (state: RootState) => state.previousReviewFiles[reviewUUID] || {},
    ({ data }) => data,
  );
