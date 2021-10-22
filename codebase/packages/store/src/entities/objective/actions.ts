import { createAsyncAction, createAction } from 'typesafe-actions';

export const addObjective = createAction('objectives/ADD_REQUEST')<{ any }>();

export const getObjective = createAsyncAction(
  'objectives/FETCH_REQUEST',
  'objectives/FETCH_SUCCESS',
  'objectives/FETCH_FAILURE',
  'objectives/CANCEL',
)<any, any, Error>();

export const createObjective = createAsyncAction(
  'objectives/CREATE_REQUEST',
  'objectives/CREATE_SUCCESS',
  'objectives/CREATE_FAILURE',
)<any, any, Error>();

export const updateObjective = createAsyncAction(
  'objectives/UPDATE_REQUEST',
  'objectives/UPDATE_SUCCESS',
  'objectives/UPDATE_FAILURE',
  'objectives/CANCEL',
)<any, any, Error>();

export const clearObjectiveData = createAction('objectives/CLEAR')<undefined>();

export const Actions = {
  getObjective: getObjective.request,
  addObjective: addObjective,
  createObjective: createObjective.request,
  updateObjective: updateObjective.request,
  clearObjectiveData,
};
