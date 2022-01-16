//@ts-ignore
import { RootState } from 'typesafe-actions';

export const orgObjectivesSelector = (state: RootState) => state.orgObjectives.objectives;

export const orgObjectivesMetaSelector = (state: RootState) => state.orgObjectives.meta;
