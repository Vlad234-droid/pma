import { createSelector } from 'reselect';
import { CalibrationSession } from '@pma/openapi';

import { InitialStateType } from '../entities/calibrationSessions/reducer';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const calibrationSessionsSelector = (state: RootState): InitialStateType => state.calibrationSessions;

export const calibrationSessionsMetaSelector = createSelector(
  calibrationSessionsSelector,
  (calibrationSessions) => calibrationSessions.meta,
);

export const getCreatedCalibrationSessionsUuidSelector = createSelector(
  calibrationSessionsSelector,
  (calibrationSessions) => calibrationSessions.createdUuid,
);

export const getCalibrationSessionsSelector = createSelector(
  calibrationSessionsSelector,
  (calibrationSessions) => calibrationSessions.data,
);

type Return = (state: RootState) => CalibrationSession | undefined;
export const getCalibrationSessionSelector = (uuid: string): Return => {
  //@ts-ignore
  return createSelector(getCalibrationSessionsSelector, (calibrationSessions) => {
    return calibrationSessions.find((cs) => cs.uuid === uuid);
  });
};
