import { createReducer } from 'typesafe-actions';
import {
  createNewFeedback,
  readFeedback,
  updateFeedback,
  getObjectiveReviews,
  clearFeedback,
  getGiveFeedback,
  getRespondFeedback,
  getViewFeedback,
  getGivenFeedbacks,
  getRequestedFeedbacks,
} from './actions';

export const initialState = {
  reviews: [],
  feedbacks: {
    give: [],
    respond: [],
    view: [],
    meta: { loading: false, loaded: false, error: null },
  },
  feedbacksCount: {
    given: 0,
    requested: 0,
  },
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getGiveFeedback.request, (state) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      meta: {
        ...state.feedbacks.meta,
        loading: true,
        loaded: false,
      },
    },
  }))
  .handleAction(getGiveFeedback.success, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      give: payload,
      meta: {
        ...state.feedbacks.meta,
        loading: false,
        loaded: true,
      },
    },
  }))
  .handleAction(getGiveFeedback.failure, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      meta: { ...state.feedbacks.meta, loading: false, loaded: false, error: payload },
    },
  }))
  .handleAction(getViewFeedback.request, (state) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      meta: {
        ...state.feedbacks.meta,
        loading: true,
        loaded: false,
      },
    },
  }))
  .handleAction(getViewFeedback.success, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedback,
      view: payload,
      meta: {
        ...state.feedbacks.meta,
        loading: false,
        loaded: true,
      },
    },
  }))
  .handleAction(getViewFeedback.failure, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      meta: { ...state.feedbacks.meta, loading: false, loaded: false, error: payload },
    },
  }))

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
  .handleAction(updateFeedback.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(updateFeedback.success, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      loading: false,
      loaded: true,
    },
  }))
  .handleAction(updateFeedback.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
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

  .handleAction(getRespondFeedback.request, (state) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      meta: {
        ...state.feedbacks.meta,
        loading: true,
        loaded: false,
      },
    },
  }))
  .handleAction(getRespondFeedback.success, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      respond: payload,
      meta: {
        ...state.feedbacks.meta,
        loading: false,
        loaded: true,
      },
    },
  }))
  .handleAction(getRespondFeedback.failure, (state, { payload }) => ({
    ...state,
    feedbacks: {
      ...state.feedbacks,
      meta: { ...state.feedbacks.meta, loading: false, loaded: false, error: payload },
    },
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
  }))
  .handleAction(clearFeedback, () => ({ ...initialState }));
