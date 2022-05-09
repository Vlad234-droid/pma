import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const objectivesSharingSelector = (state: RootState) => state.objectivesSharing;
export const objectivesSharingMetaSelector = (state: RootState) => state.objectivesSharing?.meta || {};

export const isSharedSelector = createSelector(objectivesSharingSelector, ({ isShared }) => isShared);

export const getAllSharedObjectives = createSelector(objectivesSharingSelector, ({ objectives }) => objectives);
