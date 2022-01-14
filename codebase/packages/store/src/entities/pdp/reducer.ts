import { createReducer } from 'typesafe-actions';
import {
  createPDPGoal,
  updatePDPGoal,
  getPDPGoal,
  clearPDPData,
} from './actions';

export const initialState = {
  origin: [],
  meta: { loading: false, loaded: false, error: null, status: null },
  pdp: [],
};

export default createReducer(initialState)
  .handleAction(createPDPGoal.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(createPDPGoal.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(updatePDPGoal.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(updatePDPGoal.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(getPDPGoal.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(getPDPGoal.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getPDPGoal.cancel, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: false },
  }))
  .handleAction(getPDPGoal.failure, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: false },
  }))
  .handleAction(clearPDPData, () => initialState);
