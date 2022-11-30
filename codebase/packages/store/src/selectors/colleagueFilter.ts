import { createSelector } from 'reselect';

import { InitialStateType } from '../entities/colleagueFilter/reducer';

//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const colleagueFilterSelector = (state: RootState): InitialStateType => state.colleagueFilter;

export const colleagueFilterMetaSelector = createSelector(
  colleagueFilterSelector,
  (colleagueFilter) => colleagueFilter.meta,
);

export const getColleagueFilterSelector = createSelector(
  colleagueFilterSelector,
  (colleagueFilter) => colleagueFilter.data,
);
