import { createSelector } from 'reselect';

import { InitialStateType, CSData } from '../entities/calibrationStatistics/reducer';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const calibrationStatisticsSelector = (state: RootState): InitialStateType => state.calibrationStatistics;

export const calibrationStatisticsMetaSelector = createSelector(
  calibrationStatisticsSelector,
  (calibrationStatistics) => calibrationStatistics.meta,
);

export const calibrationStatisticsDataSelector = createSelector(
  calibrationStatisticsSelector,
  (calibrationStatistics): CSData => calibrationStatistics.data,
);
