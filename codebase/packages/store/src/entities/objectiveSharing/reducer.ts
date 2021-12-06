import { createReducer } from 'typesafe-actions';
import { stopSharing, checkSharing, getSharings, startSharing } from './actions';

export const initialState = {
  objectives: [],
  isShared: false,
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(stopSharing.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(stopSharing.success, (state, { payload }) => ({
    ...state,
    isShared: false,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(stopSharing.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(checkSharing.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(checkSharing.success, (state, { payload }) => ({
    ...state,
    isShared: payload.data,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(checkSharing.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(getSharings.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getSharings.success, (state, { payload }) => ({
    ...state,
    objectives: payload.data,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getSharings.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(startSharing.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(startSharing.success, (state) => ({
    ...state,
    isShared: true,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(startSharing.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }));
