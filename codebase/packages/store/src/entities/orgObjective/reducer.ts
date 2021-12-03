import { createReducer } from 'typesafe-actions';
import {
  clearOrgObjectiveData,
  getOrgObjectives,
  createOrgObjective,
  createAndPublishOrgObjective,
  publishOrgObjective,
  getOrgAuditLogs,
} from './actions';

export const initialState = {
  origin: [],
  meta: { loading: false, loaded: false, error: null, status: null },
  objectives: [],
  auditLogs: [],
};

export default createReducer(initialState)
  .handleAction(createOrgObjective.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(createOrgObjective.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(createAndPublishOrgObjective.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(createAndPublishOrgObjective.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(publishOrgObjective.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(publishOrgObjective.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(getOrgObjectives.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(getOrgObjectives.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(getOrgAuditLogs.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(getOrgAuditLogs.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(clearOrgObjectiveData, () => initialState);
