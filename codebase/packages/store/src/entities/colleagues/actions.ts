import { createAsyncAction, createAction } from 'typesafe-actions';

export const getColleagues = createAsyncAction(
  'collegues/GET_COLLEGUES_REQUEST',
  'collegues/GET_COLLEGUES_SUCCESS',
  'collegues/GET_COLLEGUES_FAILURE',
)<any, any, Error>();

export const clearGettedCollegues = createAction('collegues/CLEAR')<undefined>();

export const Actions = {
  getColleagues: getColleagues.request,
  clearGettedCollegues,
};
