import { createAction, createAsyncAction } from 'typesafe-actions';

export const getColleagueByUuid = createAsyncAction(
  'colleague/GET_COLLEAGUE_REQUEST',
  'colleague/GET_COLLEAGUE_SUCCESS',
  'colleague/GET_COLLEAGUE_FAILURE',
)<any, any, Error>();

export const clearColleagueData = createAction('colleague/CLEAR')<undefined>();

export const Actions = {
  getColleagueByUuid: getColleagueByUuid.request,
  clearColleagueData,
};
