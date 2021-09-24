import { createReducer } from 'typesafe-actions';
import { getCurrentUser } from './actions';

export const initialState = {
  current: {
    authenticated: false,
    info: undefined,
  },
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  current: { ...state.current, info: payload, authenticated: true },
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  current: { ...state.current, authenticated: false },
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getCurrentUser.request, request)
  .handleAction(getCurrentUser.success, success)
  .handleAction(getCurrentUser.failure, failure);
