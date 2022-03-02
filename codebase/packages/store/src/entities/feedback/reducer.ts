import { createReducer } from 'typesafe-actions';
import {
  createNewFeedback,
  getAllFeedbacks,
  readFeedback,
  updatedFeedback,
  getObjectiveReviews,
  clearFeedback,
  getGiveFeedback,
  getRespondFeedback,
  getViewFeedback,
  getGivenFeedbacks,
  getRequestedFeedbacks,
} from './actions';

export const initialState = {
  notes: [],
  reviews: [],
  feedbacks: {
    give: [],
    respond: [],
    view: [],
  },
  feedbacksCount: {
    given: 0,
    requested: 0,
  },
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
  }))
  .handleAction(getGiveFeedback.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getGiveFeedback.success, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      give: payload,
    },
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))
  .handleAction(getGiveFeedback.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(getRespondFeedback.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getRespondFeedback.success, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedback,
      respond: payload,
    },
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))
  .handleAction(getRespondFeedback.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getViewFeedback.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getViewFeedback.success, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedback,
      view: payload,
    },
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))
  .handleAction(getViewFeedback.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getGivenFeedbacks.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getGivenFeedbacks.success, (state, { payload }) => ({
    ...state,
    feedbacksCount: {
      ...state.feedbacksCount,
      given: payload,
    },
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))
  .handleAction(getGivenFeedbacks.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getRequestedFeedbacks.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getRequestedFeedbacks.success, (state, { payload }) => ({
    ...state,
    feedbacksCount: {
      ...state.feedbacksCount,
      requested: payload,
    },
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))
  .handleAction(getRequestedFeedbacks.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }));
