//@ts-ignore
import { RootState } from 'typesafe-actions';

export const colleagueDataSelector = (state: RootState) => state.colleagueData;

export const sourcesSelector = (state: RootState) => state.colleagueData.sources;
