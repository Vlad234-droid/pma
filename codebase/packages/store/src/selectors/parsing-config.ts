//@ts-ignore
import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const parsingConfigSelector = (state: RootState) => state.parsingConfig.data;

export const parsingConfigLoadingSelector = (state: RootState) => state.parsingConfig.meta.loading;

export const parsingConfigForSubsidiarySelector = (uuid: string) =>
  createSelector(parsingConfigSelector, (data) => (data ? data[uuid] : null));
