import { createSelector } from 'reselect';

import { InitialStateType } from '../entities/calibrationReview/reducer';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const calibrationReviewSelector = (state: RootState): InitialStateType => state.calibrationReview;

export const calibrationReviewMetaSelector = createSelector(
  calibrationReviewSelector,
  (calibrationSessions) => calibrationSessions.meta,
);

export const calibrationReviewDataSelector = createSelector(
  calibrationReviewSelector,
  (calibrationSessions) => calibrationSessions.data,
);
