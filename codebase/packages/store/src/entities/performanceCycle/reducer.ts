import { createReducer } from 'typesafe-actions';
import { getGetAllPerformanceCycles, getPerformanceCycleByUuid } from './actions';

export const initialState = {
  data: [],
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  ...payload,
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

const byIdRequest = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const byIdSuccess = (state, { payload }) => {
  // todo refactor
  return {
    data:
      state?.data?.length > 0
        ? state.data.map((pmCycle) => {
            if (pmCycle.uuid !== payload.data.cycle.uuid) return pmCycle;
            return { ...pmCycle, ...payload.data.cycle, forms: payload.data.forms };
          })
        : [payload.data],
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const byIdFailure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getGetAllPerformanceCycles.request, request)
  .handleAction(getGetAllPerformanceCycles.success, success)
  .handleAction(getGetAllPerformanceCycles.failure, failure)
  .handleAction(getPerformanceCycleByUuid.request, byIdRequest)
  .handleAction(getPerformanceCycleByUuid.success, byIdSuccess)
  .handleAction(getPerformanceCycleByUuid.failure, byIdFailure);
