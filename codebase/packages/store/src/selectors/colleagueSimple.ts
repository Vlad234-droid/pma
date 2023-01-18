import { createSelector } from 'reselect';

import { InitialStateType } from '../entities/colleagueSimple/reducer';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const colleagueSimpleSelector = (state: RootState): InitialStateType => state.colleagueSimple;

export const colleagueSimpleMetaSelector = createSelector(
  colleagueSimpleSelector,
  (colleagueSimple) => colleagueSimple.meta,
);

export const getColleagueSimpleSelector = createSelector(
  colleagueSimpleSelector,
  (colleagueSimple) => colleagueSimple.data,
);
