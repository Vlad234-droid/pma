import { createSelector } from 'reselect';

//@ts-ignore
import { RootState } from 'typesafe-actions';
import { CSRatings } from '../entities/calibrationStatisticsRatings/reducer';

//@ts-ignore
export const calibrationStatisticsRatingsSelector = (state: RootState) => state.calibrationStatisticsRatings;

export const calibrationStatisticsRatingsMetaSelector = createSelector(
  calibrationStatisticsRatingsSelector,
  (calibrationStatisticsRatings) => calibrationStatisticsRatings.meta,
);

export const calibrationStatisticsRatingsDataSelector = createSelector(
  calibrationStatisticsRatingsSelector,
  (calibrationStatistics): CSRatings => calibrationStatistics.data,
);
