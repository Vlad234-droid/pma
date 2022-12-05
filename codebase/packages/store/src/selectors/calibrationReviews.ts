import { createSelector } from 'reselect';

import { InitialStateType } from '../entities/calibrationReviews/reducer';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const calibrationReviewsSelector = (state: RootState): InitialStateType => state.calibrationReviews;

export const calibrationReviewsMetaSelector = createSelector(
  calibrationReviewsSelector,
  (calibrationReviews) => calibrationReviews.meta,
);

export const calibrationReviewsDataSelector = createSelector(
  calibrationReviewsSelector,
  (calibrationReviews) => calibrationReviews.data,
);
