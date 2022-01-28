import { createReducer } from 'typesafe-actions';
import { getGetAllPerformanceCycles, getPerformanceCycleByUuid } from './actions';

export const initialState = {
  data: [],
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

const byIdRequest = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const byIdSuccess = (state, { payload }) => {
  const { cycle } = payload.data;
  cycle.metadata.cycle.timelinePoints = cycle.metadata.cycle.timelinePoints.map((point) => {
    const form = payload.data.forms.find((form) => form.id === point.form?.id);
    return { ...point, form };
  });
  return {
    data:
      state?.data?.length > 0
        ? state.data.map((pmCycle) => {
            if (pmCycle.uuid !== cycle.uuid) return pmCycle;
            return { ...pmCycle, ...cycle, forms: payload.data.forms };
          })
        : [cycle],
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
