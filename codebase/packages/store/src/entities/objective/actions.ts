import { createAsyncAction, createAction } from 'typesafe-actions';

export const getObjective = createAsyncAction(
  'objectives/FETCH_REQUEST',
  'objectives/FETCH_SUCCESS',
  'objectives/FETCH_FAILURE',
  'objectives/CANCEL',
)<any, any, Error>();

export const getObjectives = createAsyncAction(
  'objectives/FETCH_ALL_REQUEST',
  'objectives/FETCH_ALL_SUCCESS',
  'objectives/FETCH_ALL_FAILURE',
  'objectives/CANCEL',
)<any, any, Error>();

export const createObjective = createAsyncAction(
  'objectives/CREATE_REQUEST',
  'objectives/CREATE_SUCCESS',
  'objectives/CREATE_FAILURE',
)<any, any, Error>();

export const deleteObjective = createAsyncAction(
  'objectives/DELETE_REQUEST',
  'objectives/DELETE_SUCCESS',
  'objectives/DELETE_FAILURE',
  'objectives/CANCEL',
)<any, any, Error>();

export const updateObjective = createAsyncAction(
  'objectives/UPDATE_REQUEST',
  'objectives/UPDATE_SUCCESS',
  'objectives/UPDATE_FAILURE',
  'objectives/CANCEL',
)<any, any, Error>();

export const updateObjectives = createAsyncAction(
  'objectives/UPDATE_ALL_REQUEST',
  'objectives/UPDATE_ALL_SUCCESS',
  'objectives/UPDATE_ALL_FAILURE',
  'objectives/CANCEL',
)<any, any, Error>();

export const clearObjectiveData = createAction('objectives/CLEAR')<undefined>();

export const Actions = {
  getObjective: getObjective.request,
  getObjectives: getObjectives.request,
  createObjective: createObjective.request,
  updateObjective: updateObjective.request,
  updateObjectives: updateObjectives.request,
  deleteObjective: deleteObjective.request,
  clearObjectiveData,
};
