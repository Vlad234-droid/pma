import { createReducer } from 'typesafe-actions';
import {
  createPerformanceCycle,
  getGetAllPerformanceCycles,
  getPerformanceCycleByUuid,
  updatePerformanceCycle,
  getPerformanceCycleMappingKeys,
} from './actions';

export const initialState = {
  data: [],
  forms: {},
  mappingKeys: [],
  meta: { loading: false, loaded: false, error: null },
};

const getAllPerformanceCycleRequest = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const getAllPerformanceCycleSuccess = (state, { payload }) => {
  return {
    ...state,
    data: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const getAllPerformanceCycleFailure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

const byIdRequest = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const byIdSuccess = (state, { payload }) => {
  const { cycle, forms } = payload;
  return {
    data:
      state?.data?.length > 0 ? state.data.map((pmCycle) => (pmCycle.uuid !== cycle.uuid ? pmCycle : cycle)) : [cycle],
    forms: { ...state.forms, [cycle.uuid]: forms },
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const byIdFailure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

const createPerformanceCycleSuccess = (state, { payload }) => ({
  ...state,
  data: [...state.data, payload],
});

const updatePerformanceCycleSuccess = (state, { payload }) => ({
  ...state,
  data: state.data.map((cycle) => (cycle.uuid === payload.uuid ? payload : cycle)),
});

const getPerformanceCycleMappingKeysSuccess = (state, { payload }) => ({
  ...state,
  mappingKeys: payload,
});

export default createReducer(initialState)
  .handleAction(getGetAllPerformanceCycles.request, getAllPerformanceCycleRequest)
  .handleAction(getGetAllPerformanceCycles.success, getAllPerformanceCycleSuccess)
  .handleAction(getGetAllPerformanceCycles.failure, getAllPerformanceCycleFailure)
  .handleAction(getPerformanceCycleByUuid.request, byIdRequest)
  .handleAction(getPerformanceCycleByUuid.success, byIdSuccess)
  .handleAction(getPerformanceCycleByUuid.failure, byIdFailure)
  .handleAction(createPerformanceCycle.success, createPerformanceCycleSuccess)
  .handleAction(updatePerformanceCycle.success, updatePerformanceCycleSuccess)
  .handleAction(getPerformanceCycleMappingKeys.success, getPerformanceCycleMappingKeysSuccess);
