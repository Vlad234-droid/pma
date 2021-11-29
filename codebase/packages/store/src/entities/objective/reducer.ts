import { createReducer } from 'typesafe-actions';
import {
  clearObjectiveData,
  createObjective,
  deleteObjective,
  getObjectives,
  updateObjective,
  updateObjectives,
  getReviewByUuid,
} from './actions';

export const initialState = {
  origin: [],
  review: [],
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

  .handleAction(getReviewByUuid.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(getReviewByUuid.success, (state, { payload }) => ({
    ...state,
    review: [...state.review, { ...payload }],
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(clearObjectiveData, () => initialState);
