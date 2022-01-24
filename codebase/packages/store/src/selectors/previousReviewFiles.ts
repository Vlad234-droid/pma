//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const previousReviewFilesSelector = (state: RootState) => state.previousReviewFiles || {};

// @ts-ignore
export const getPreviousReviewFilesSelector = createSelector(previousReviewFilesSelector, ({ data }) => data);
