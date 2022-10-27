import { createAction, createAsyncAction } from 'typesafe-actions';
import { CalibrationSession } from '@pma/openapi';

export const getCalibrationSession = createAsyncAction(
  'calibrationSession/FETCH_REQUEST',
  'calibrationSession/FETCH_SUCCESS',
  'calibrationSession/FETCH_FAILURE',
  'calibrationSession/FETCH_CANCEL',
)<any, any, Error>();

export const getCalibrationSessions = createAsyncAction(
  'calibrationSessions/FETCH_ALL_REQUEST',
  'calibrationSessions/FETCH_ALL_SUCCESS',
  'calibrationSessions/FETCH_ALL_FAILURE',
  'calibrationSessions/FETCH_ALL_CANCEL',
)<any, { data: CalibrationSession[] }, Error>();

export const createCalibrationSession = createAsyncAction(
  'calibrationSession/CREATE_REQUEST',
  'calibrationSession/CREATE_SUCCESS',
  'calibrationSession/CREATE_FAILURE',
  'calibrationSession/CREATE_CANCEL',
)<any, any, Error>();

export const updateCalibrationSession = createAsyncAction(
  'calibrationSession/UPDATE_REQUEST',
  'calibrationSession/UPDATE_SUCCESS',
  'calibrationSession/UPDATE_FAILURE',
  'calibrationSession/UPDATE_CANCEL',
)<any, any, Error>();

export const deleteCalibrationSession = createAsyncAction(
  'calibrationSession/DELETE_REQUEST',
  'calibrationSession/DELETE_SUCCESS',
  'calibrationSession/DELETE_FAILURE',
  'calibrationSession/DELETE_CANCEL',
)<any, any, Error>();

export const updateCalibrationSessionMeta = createAction('calibrationSession/meta/UPDATE')<{
  loaded?: boolean;
  updated?: boolean;
}>();

export const clearCalibrationSessionData = createAction('calibrationSession/CLEAR')<undefined>();

export const Actions = {
  getCalibrationSession: getCalibrationSession.request,
  getCalibrationSessions: getCalibrationSessions.request,
  createCalibrationSession: createCalibrationSession.request,
  updateCalibrationSession: updateCalibrationSession.request,
  deleteCalibrationSession: deleteCalibrationSession.request,
  updateCalibrationSessionMeta,
  clearCalibrationSessionData,
};
