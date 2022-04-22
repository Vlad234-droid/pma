//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const previousReviewFilesSelector = (state: RootState) => state.previousReviewFiles || {};

export const isDeleteFileSuccess = (state: RootState) =>
  state.previousReviewFiles.deleteFileMeta.loaded && !state.previousReviewFiles.deleteFileMeta.error;

export const isDeleteFileLoaded = (state: RootState) => state.previousReviewFiles.deleteFileMeta.loaded;

// @ts-ignore
export const getPreviousReviewFilesSelector = createSelector(previousReviewFilesSelector, ({ data }) => data);
