//@ts-ignore
import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const channelConfigSelector = (state: RootState) => state.subsidiaryChannelConfig.data;

export const channelConfigLoadingSelector = (state: RootState) => state.subsidiaryChannelConfig.meta.loading;

export const channelConfigForSubsidiarySelector = (uuid: string) =>
  createSelector(channelConfigSelector, (data) => (data ? data[uuid] : null));
