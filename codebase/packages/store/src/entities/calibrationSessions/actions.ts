import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  RequestQuery,
  RestResponseListCalibrationSession,
  RestResponseCalibrationSession,
  CalibrationSession,
  RestResponseVoid,
} from '@pma/openapi';

type DeleteCalibrationSessions = {
  uuid: string;
};

export const getCalibrationSession = createAsyncAction(
  'calibrationSession/FETCH_REQUEST',
  'calibrationSession/FETCH_SUCCESS',
  'calibrationSession/FETCH_FAILURE',
  'calibrationSession/FETCH_CANCEL',
)<any, RestResponseCalibrationSession, Error>();

export const getCalibrationSessions = createAsyncAction(
  'calibrationSessions/FETCH_ALL_REQUEST',
  'calibrationSessions/FETCH_ALL_SUCCESS',
  'calibrationSessions/FETCH_ALL_FAILURE',
  'calibrationSessions/FETCH_ALL_CANCEL',
)<RequestQuery, RestResponseListCalibrationSession, Error>();

export const createCalibrationSession = createAsyncAction(
  'calibrationSession/CREATE_REQUEST',
  'calibrationSession/CREATE_SUCCESS',
  'calibrationSession/CREATE_FAILURE',
  'calibrationSession/CREATE_CANCEL',
)<Omit<CalibrationSession, 'participants'>, RestResponseCalibrationSession, Error>();

export const updateCalibrationSession = createAsyncAction(
  'calibrationSession/UPDATE_REQUEST',
  'calibrationSession/UPDATE_SUCCESS',
  'calibrationSession/UPDATE_FAILURE',
  'calibrationSession/UPDATE_CANCEL',
)<Omit<CalibrationSession, 'participants'>, RestResponseCalibrationSession, Error>();

export const deleteCalibrationSession = createAsyncAction(
  'calibrationSession/DELETE_REQUEST',
  'calibrationSession/DELETE_SUCCESS',
  'calibrationSession/DELETE_FAILURE',
  'calibrationSession/DELETE_CANCEL',
)<DeleteCalibrationSessions, RestResponseVoid, Error>();

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
