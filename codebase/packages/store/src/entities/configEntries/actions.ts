import { createAsyncAction } from 'typesafe-actions';

export const getConfigEntries = createAsyncAction(
  'config-entries/REQUEST',
  'config-entries/SUCCESS',
  'config-entries/FAILURE',
  'config-entries/CANCEL',
)<undefined, any, Error, undefined>();

export const getConfigEntriesByUuid = createAsyncAction(
  'config-entries/BYUUID_REQUEST',
  'config-entries/BYUUID_SUCCESS',
  'config-entries/BYUUID_FAILURE',
  'config-entries/BYUUID_CANCEL',
)<any, any, Error>();

export const Actions = {
  getConfigEntries: getConfigEntries.request,
  getConfigEntriesByUuid: getConfigEntriesByUuid.request,
};
