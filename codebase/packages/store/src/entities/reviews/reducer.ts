import { createReducer } from 'typesafe-actions';
import union from 'lodash.union';
import {
  getReviews,
  deleteReview,
  createReview,
  updateReview,
  updateReviews,
  clearReviewData,
  getColleagueReviews,
  getReviewsWithNotes,
  updateReviewStatus,
  updateReviewsState,
  getReviewByUuid,
  updateRatingReview,
  updateReviewMeta,
} from './actions';

export const initialState = {
  data: [],
  colleagueReviews: {},
  meta: { loading: false, loaded: false, error: null, status: null, saving: false, saved: false },
};

export default createReducer(initialState)
  .handleAction(getReviews.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getReviews.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getReviews.failure, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })
  .handleAction(getColleagueReviews.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getColleagueReviews.success, (state, { payload }) => {
    const { data = [], colleagueReviews = {} } = payload;
    return {
      ...state,
      colleagueReviews: { ...state.colleagueReviews, ...colleagueReviews },
      data,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getReviewsWithNotes.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getReviewsWithNotes.failure, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })
  .handleAction(getReviewsWithNotes.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(deleteReview.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(deleteReview.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(createReview.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, error: null, saving: true, saved: false },
    };
  })
  .handleAction(createReview.success, (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
    meta: { ...state.meta, saving: false, saved: true },
  }))
  .handleAction(updateReview.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, error: null, loaded: false, saving: true, saved: false },
    };
  })
  .handleAction(updateReview.success, (state, { payload }) => ({
    ...state,
    data: state.data.map((review) => (review.uuid === payload.uuid ? payload : review)),
    meta: { ...state.meta, saving: false, saved: true },
  }))
  .handleAction(updateReviews.request, (state) => ({
    ...state,
    meta: { ...state.meta, saving: true, saved: false },
  }))
  .handleAction(updateReviews.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, saving: false, saved: true },
  }))
  .handleAction(updateReviews.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, saving: false, saved: false, error: payload },
  }))
  .handleAction(updateReviewStatus.request, (state) => ({
    ...state,
    meta: { ...state.meta, saving: true, saved: false },
  }))
  .handleAction(updateReviewStatus.success, (state) => ({
    ...state,
    meta: { ...state.meta, saving: false, saved: true },
  }))
  .handleAction(updateReviewStatus.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, saving: false, saved: false, error: payload },
  }))
  .handleAction(updateReviewsState, (state, { payload }) => ({
    ...state,
    ...payload,
  }))
  .handleAction(getReviewByUuid.success, (state, { payload }) => ({
    ...state,
    data: union([payload], state.data),
  }))
  .handleAction(getReviewByUuid.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: false, error: payload },
  }))
  .handleAction(updateRatingReview.request, (state) => ({
    ...state,
    meta: { ...state.meta, error: null, loading: false, updating: true, updated: false },
  }))
  .handleAction(updateRatingReview.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true, updating: false, updated: true },
  }))
  .handleAction(updateRatingReview.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, updating: false, error: payload },
  }))
  .handleAction(updateReviewMeta, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, ...payload },
  }))
  .handleAction(clearReviewData, () => initialState);
