import { createAsyncAction, createAction } from 'typesafe-actions';
import { initialState } from './reducer';

export const getColleagues = createAsyncAction(
  'colleagues/GET_COLLEAGUES_REQUEST',
  'colleagues/GET_COLLEAGUES_SUCCESS',
  'colleagues/GET_COLLEAGUES_FAILURE',
)<any, any, Error>();

export const getProfileColleague = createAsyncAction(
  'colleagues/GET_PROFILE_COLLEAGUE_REQUEST',
  'colleagues/GET_PROFILE_COLLEAGUE_SUCCESS',
  'colleagues/GET_PROFILE_COLLEAGUE_FAILURE',
)<any, any, Error>();

export const clearColleagueList = createAction('colleagues/CLEAR')<undefined>();

export const changeColleaguesMeta = createAction('colleagues/meta/CHANGE')<Partial<typeof initialState.meta>>();

export const Actions = {
  getColleagues: getColleagues.request,
  getProfileColleague: getProfileColleague.request,
  clearColleagueList,
  changeColleaguesMeta,
};
