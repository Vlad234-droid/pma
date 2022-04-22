import { createAsyncAction, createAction } from 'typesafe-actions';

export const getGetAllPerformanceCycles = createAsyncAction(
  'performance-cycles/REQUEST',
  'performance-cycles/SUCCESS',
  'performance-cycles/FAILURE',
  'performance-cycles/CANCEL',
)<undefined, any, Error, undefined>();

export const getPerformanceCycleByUuid = createAsyncAction(
  'performance-cycles/GET_BY_ID_REQUEST',
  'performance-cycles/GET_BY_ID_SUCCESS',
  'performance-cycles/GET_BY_ID_FAILURE',
  'performance-cycles/GET_BY_ID_CANCEL',
)<any, any, Error, undefined>();

export const createPerformanceCycle = createAsyncAction(
  'performance-cycles/CREATE_REQUEST',
  'performance-cycles/CREATE_SUCCESS',
  'performance-cycles/CREATE_FAILURE',
)<any, any, Error>();

export const updatePerformanceCycle = createAsyncAction(
  'performance-cycles/UPDATE_REQUEST',
  'performance-cycles/UPDATE_SUCCESS',
  'performance-cycles/UPDATE_FAILURE',
)<any, any, Error>();

export const updatePerformanceCycleStatus = createAsyncAction(
  'performance-cycles/status/UPDATE_REQUEST',
  'performance-cycles/status/UPDATE_SUCCESS',
  'performance-cycles/status/UPDATE_FAILURE',
)<{ uuid: string; status: string }, any, Error>();

export const publishPerformanceCycle = createAsyncAction(
  'performance-cycles/PUBLISH_REQUEST',
  'performance-cycles/PUBLISH_SUCCESS',
  'performance-cycles/PUBLISH_FAILURE',
)<any, any, Error>();

export const getPerformanceCycleMappingKeys = createAsyncAction(
  'performance-cycles/mapping-keys/REQUEST',
  'performance-cycles/mapping-keys/SUCCESS',
  'performance-cycles/mapping-keys/FAILURE',
)<undefined, any, Error>();

export const resetMetaStatusRequest = createAction('performance-cycles/meta/status/RESET')();

export const Actions = {
  getGetAllPerformanceCycles: getGetAllPerformanceCycles.request,
  getPerformanceCycleByUuid: getPerformanceCycleByUuid.request,
  createPerformanceCycle: createPerformanceCycle.request,
  updatePerformanceCycle: updatePerformanceCycle.request,
  updatePerformanceCycleStatus: updatePerformanceCycleStatus.request,
  publishPerformanceCycle: publishPerformanceCycle.request,
  getPerformanceCycleMappingKeys: getPerformanceCycleMappingKeys.request,
  resetMetaStatusRequest,
};
