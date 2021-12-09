import { createAsyncAction } from 'typesafe-actions';

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

export const Actions = {
  getGetAllPerformanceCycles: getGetAllPerformanceCycles.request,
  getPerformanceCycleByUuid: getPerformanceCycleByUuid.request,
  createPerformanceCycle: createPerformanceCycle.request,
};
