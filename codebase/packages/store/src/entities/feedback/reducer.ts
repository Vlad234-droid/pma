import { createReducer } from 'typesafe-actions';
import {
  createNewFeedback,
  getAllFeedbacks,
  readFeedback,
  updatedFeedback,
  getObjectiveReviews,
  clearFeedback,
} from './actions';

export const initialState = {
  notes: [],
  reviews: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(createNewFeedback.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(createNewFeedback.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(createNewFeedback.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getAllFeedbacks.request, (state) => ({
    ...state,
    meta: { loading: true, loaded: false, error: null },
  }))
  .handleAction(getAllFeedbacks.success, (state, { payload }) => ({
    ...state,
    notes: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(clearFeedback, (state) => ({ ...state, notes: [] }))
  .handleAction(readFeedback.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(readFeedback.success, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))
  .handleAction(updatedFeedback.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(updatedFeedback.success, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))

  .handleAction(getObjectiveReviews.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getObjectiveReviews.success, (state, { payload }) => ({
    ...state,
    reviews: payload,
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }));
