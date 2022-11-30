import { createAction, createAsyncAction } from 'typesafe-actions';
import { RestResponseListColleagueSimple } from '@pma/openapi';

export const getColleagueSimple = createAsyncAction(
  'colleagueSimple/FETCH_REQUEST',
  'colleagueSimple/FETCH_SUCCESS',
  'colleagueSimple/FETCH_FAILURE',
  'colleagueSimple/FETCH_CANCEL',
)<any, RestResponseListColleagueSimple, Error>();

export const clearColleagueSimple = createAction('colleagueSimple/CLEAR')<undefined>();

export const Actions = {
  getColleagueSimple: getColleagueSimple.request,
  clearColleagueSimple,
};
