//@ts-ignore
import { RootState } from 'typesafe-actions';

export const orgObjectivesSelector = (state: RootState) => state.orgObjectives.objectives;
