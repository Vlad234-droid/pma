import { createReducer } from 'typesafe-actions';
import { getManagers } from './actions';

export const initialState = {
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

export default createReducer(initialState)
  .handleAction(getManagers.request, request)
  .handleAction(getManagers.success, success)
  .handleAction(getManagers.failure, failure);
