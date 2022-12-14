import { createAction, createAsyncAction } from 'typesafe-actions';
import { RestResponseListCalibrationColleague, RestResponseListColleagueSimple } from '@pma/openapi';

export const getColleagueSimple = createAsyncAction(
  'colleagueSimple/FETCH_REQUEST',
  'colleagueSimple/FETCH_SUCCESS',
  'colleagueSimple/FETCH_FAILURE',
  'colleagueSimple/FETCH_CANCEL',
)<any, RestResponseListCalibrationColleague, Error>();

export const getSessionColleagueSimple = createAsyncAction(
  'getSessionColleagueSimple/FETCH_REQUEST',
  'getSessionColleagueSimple/FETCH_SUCCESS',
  'getSessionColleagueSimple/FETCH_FAILURE',
  'getSessionColleagueSimple/FETCH_CANCEL',
)<{ query: any; sessionId: string }, RestResponseListColleagueSimple, Error>();

export const clearColleagueSimple = createAction('colleagueSimple/CLEAR')<undefined>();

export const Actions = {
  getColleagueSimple: getColleagueSimple.request,
  getSessionColleagueSimple: getSessionColleagueSimple.request,
  clearColleagueSimple,
};
