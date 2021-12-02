import { createAsyncAction } from 'typesafe-actions';

export const getManagers = createAsyncAction(
  'managers/REQUEST',
  'managers/SUCCESS',
  'managers/FAILURE',
  'managers/CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getManagers: getManagers.request,
};
