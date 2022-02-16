import { createReducer } from 'typesafe-actions';
import {
  getReviews,
  deleteReview,
  createReview,
  updateReview,
  updateReviews,
  clearReviewData,
  getColleagueReviews,
  updateReviewStatus,
  updateReviewsState,
  getReviewByUuid,
} from './actions';

export const initialState = {
  data: [],
  colleagueReviews: {},
  review: [],
  meta: { loading: false, loaded: false, error: null, status: null },
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
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
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

  .handleAction(createReview.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(createReview.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(updateReview.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(updateReview.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(updateReviews.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(updateReviews.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(updateReviewStatus.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(updateReviewStatus.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(updateReviewStatus.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(updateReviewsState, (state, { payload }) => ({
    ...state,
    ...payload,
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
  .handleAction(clearReviewData, () => initialState);
