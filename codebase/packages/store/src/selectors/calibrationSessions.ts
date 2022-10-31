import { createSelector } from 'reselect';

import { InitialStateType } from '../entities/calibrationSessions/reducer';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const calibrationSessionsSelector = (state: RootState): InitialStateType => state.calibrationSessions;

export const calibrationSessionsMetaSelector = createSelector(
  calibrationSessionsSelector,
  (calibrationSessions) => calibrationSessions.meta,
);

export const getCalibrationSessionsSelector = createSelector(
  calibrationSessionsSelector,
  (calibrationSessions) => calibrationSessions.data,
);
