import { createReducer } from 'typesafe-actions';
import {
  approveObjective,
  clearObjectiveData,
  createObjective,
  deleteObjective,
  getObjectives,
  updateObjective,
  updateObjectives,
} from './actions';

export const initialState = {
  origin: [],
  meta: { loading: false, loaded: false, error: null, status: null },
};

export default createReducer(initialState)
  .handleAction(getObjectives.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getObjectives.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })

  .handleAction(deleteObjective.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(deleteObjective.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })

  .handleAction(createObjective.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(createObjective.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(updateObjective.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(updateObjective.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(updateObjectives.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(updateObjectives.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(approveObjective.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(approveObjective.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(clearObjectiveData, () => initialState);
