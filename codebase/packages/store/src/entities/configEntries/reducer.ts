import { createReducer } from 'typesafe-actions';
import { getConfigEntries, getConfigEntriesByUuid } from './actions';

export const initialState = {
  data: [],
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });
const byUuidRequest = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  ...payload,
  meta: { ...state.meta, loading: false, loaded: true },
});

const byUuidSuccess = (state, { payload }) => {
  return {
    ...state,
    data: state.data.map((config) => {
      if (config.uuid !== payload.data.uuid) return config;
      return { ...config, children: payload.data.children };
    }),
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});
const byUuidFailure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getConfigEntries.request, request)
  .handleAction(getConfigEntries.success, success)
  .handleAction(getConfigEntries.failure, failure)
  .handleAction(getConfigEntriesByUuid.request, byUuidRequest)
  .handleAction(getConfigEntriesByUuid.success, byUuidSuccess)
  .handleAction(getConfigEntriesByUuid.failure, byUuidFailure);
