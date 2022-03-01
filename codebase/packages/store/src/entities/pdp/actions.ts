import { createAction, createAsyncAction } from 'typesafe-actions';

export const createPDPGoal = createAsyncAction(
  'PDPGoal/CREATE_REQUEST',
  'PDPGoal/CREATE_SUCCESS',
  'PDPGoal/CREATE_FAILURE',
)<any, any, Error>();

export const deletePDPGoal = createAsyncAction(
  'PDPGoal/DELETE_REQUEST',
  'PDPGoal/DELETE_SUCCESS',
  'PDPGoal/DELETE_FAILURE',
)<any, any, Error>();

export const updatePDPGoal = createAsyncAction(
  'PDPGoal/UPDATE_REQUEST',
  'PDPGoal/UPDATE_SUCCESS',
  'PDPGoal/UPDATE_FAILURE',
)<any, any, Error>();

export const getPDPGoal = createAsyncAction(
  'PDPGoal/FETCH_ALL_REQUEST',
  'PDPGoal/FETCH_ALL_SUCCESS',
  'PDPGoal/FETCH_ALL_FAILURE',
  'PDPGoal/FETCH_ALL_CANCEL',
)<any, any, Error>();

export const getPDPByUUIDGoal = createAsyncAction(
  'PDPGoal/FETCH_ALL_BY_UUID_REQUEST',
  'PDPGoal/FETCH_ALL_BY_UUID_SUCCESS',
  'PDPGoal/FETCH_ALL_BY_UUID_FAILURE',
  'PDPGoal/FETCH_ALL_BY_UUID_CANCEL',
)<any, any, Error>();

export const getEarlyAchievementDate = createAsyncAction(
  'PDP/GET_EARLY_ACHIEVEMENT_DATE_REQUEST',
  'PDP/GET_EARLY_ACHIEVEMENT_DATE_SUCCESS',
  'PDP/GET_EARLY_ACHIEVEMENT_DATE_FAILURE',
)<any, any, Error>();

export const clearPDPData = createAction('orgObjectives/CLEAR')<undefined>();

export const Actions = {
  createPDPGoal: createPDPGoal.request,
  getPDPGoal: getPDPGoal.request,
  getPDPByUUIDGoal: getPDPByUUIDGoal.request,
  updatePDPGoal: updatePDPGoal.request,
  deletePDPGoal: deletePDPGoal.request,
  getEarlyAchievementDate: getEarlyAchievementDate.request,
  clearPDPData,
};
