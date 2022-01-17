import { createReducer } from 'typesafe-actions';
import {
  clearOrgObjectiveData,
  getOrgObjectives,
  createOrgObjective,
  createAndPublishOrgObjective,
  publishOrgObjective,
  getOrgAuditLogs,
  changeOrgObjectiveMetaStatus,
} from './actions';

import { Status } from '../../config/types';

const initialObjectivesData = [
  { number: 1, title: '' },
  { number: 2, title: '' },
  { number: 3, title: '' },
  { number: 4, title: '' },
  { number: 5, title: '' },
  { number: 6, title: '' },
];

export const initialState = {
  objectives: [],
  auditLogs: [],
  meta: { loading: false, loaded: false, error: null, status: Status.IDLE },
};

export default createReducer(initialState)
  .handleAction(createOrgObjective.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false, status: Status.PENDING },
  }))
  .handleAction(createOrgObjective.success, (state, { payload }) => ({
    ...state,
    objectives: payload,
    meta: { ...state.meta, loading: false, loaded: true, status: Status.SUCCEEDED },
  }))

  .handleAction(createAndPublishOrgObjective.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(createAndPublishOrgObjective.success, (state, { payload }) => ({
    ...state,
    objectives: payload,
    meta: { ...state.meta, loading: false, loaded: true, status: Status.SUCCEEDED },
  }))

  .handleAction(publishOrgObjective.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false, status: Status.PENDING },
  }))
  .handleAction(publishOrgObjective.success, (state, { payload }) => ({
    ...state,
    objectives: payload,
    meta: { ...state.meta, loading: false, loaded: true, status: Status.SUCCEEDED },
  }))

  .handleAction(getOrgObjectives.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(getOrgObjectives.success, (state, { payload }) => ({
    ...state,
    objectives: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getOrgObjectives.failure, (state, { payload }) => ({
    ...state,
    objectives: initialObjectivesData,
    meta: { ...state.meta, error: payload },
  }))
  .handleAction(getOrgAuditLogs.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(getOrgAuditLogs.success, (state, { payload }) => ({
    ...state,
    auditLogs: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(changeOrgObjectiveMetaStatus, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, status: payload },
  }))
  .handleAction(clearOrgObjectiveData, () => initialState);
