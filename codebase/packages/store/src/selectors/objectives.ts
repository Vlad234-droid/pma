import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const objectivesSelector = (state: RootState) => state.objectives;
export const objectivesMetaSelector = createSelector(objectivesSelector, ({ meta }) => meta);
