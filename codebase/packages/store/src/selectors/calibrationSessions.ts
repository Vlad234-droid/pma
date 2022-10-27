import { createSelector } from 'reselect';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const calibrationSessionsSelector = (state: RootState) => state.calibrationSessions;

export const calibrationSessionsMetaSelector = createSelector(
  calibrationSessionsSelector,
  (calibrationSessions) => calibrationSessions.meta,
);

export const getCalibrationSessionsSelector = createSelector(
  calibrationSessionsSelector,
  (calibrationSessions) => calibrationSessions.data,
);
