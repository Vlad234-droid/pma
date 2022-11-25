import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const objectivesSharingSelector = (state: RootState) => state.objectivesSharing;

export const sharingObjectivesMetaSelector = createSelector(objectivesSharingSelector, ({ meta }: any) => meta);

export const isSharedSelector = createSelector(objectivesSharingSelector, ({ isShared }) => isShared);

export const getAllSharedObjectives = createSelector(objectivesSharingSelector, ({ objectives }) => objectives);
