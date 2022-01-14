import { createAction, createAsyncAction } from 'typesafe-actions';

export const createPDPGoal = createAsyncAction(
  'PDPGoal/CREATE_REQUEST',
  'PDPGoal/CREATE_SUCCESS',
  'PDPGoal/CREATE_FAILURE',
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

export const clearPDPData = createAction('orgObjectives/CLEAR')<undefined>();

export const Actions = {
  createPDPGoal: createPDPGoal.request,
  getPDPGoal: getPDPGoal.request,
  updatePDPGoal: updatePDPGoal.request,
  clearPDPData,
};
