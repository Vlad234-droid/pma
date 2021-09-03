//@ts-ignore
import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const mappingConfigSelector = (state: RootState) => state.mappingConfig.data;

export const mappingConfigLoadingSelector = (state: RootState) => state.mappingConfig.meta.loading;

export const mappingConfigForSubsidiarySelector = (uuid: string) =>
  createSelector(mappingConfigSelector, (data) => (data ? data[uuid] : null));
