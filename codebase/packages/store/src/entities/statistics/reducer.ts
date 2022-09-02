import { createReducer } from 'typesafe-actions';
import {
  clearStatistics,
  getStatisticsReview,
  getOverallRatingsStatistics,
  getNewToBusinessStatistics,
  getFeedbacksStatistics,
  getAnniversaryReviewsStatistics,
  getLeadershipReviewsStatistics,
} from './actions';

export const initialState = {
  statistics: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getStatisticsReview.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getStatisticsReview.success, (state, { payload }) => ({
    ...state,
    statistics: [...state.statistics, ...payload],
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getStatisticsReview.failure, (state, { payload }) => ({
    ...state,
    statistics: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getOverallRatingsStatistics.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getOverallRatingsStatistics.success, (state, { payload }) => ({
    ...state,
    statistics: [...state.statistics, ...payload],
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getOverallRatingsStatistics.failure, (state, { payload }) => ({
    ...state,
    statistics: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getNewToBusinessStatistics.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getNewToBusinessStatistics.success, (state, { payload }) => ({
    ...state,
    statistics: [...state.statistics, ...payload],
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getNewToBusinessStatistics.failure, (state, { payload }) => ({
    ...state,
    statistics: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getFeedbacksStatistics.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getFeedbacksStatistics.success, (state, { payload }) => ({
    ...state,
    statistics: [...state.statistics, ...payload],
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getFeedbacksStatistics.failure, (state, { payload }) => ({
    ...state,
    statistics: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getAnniversaryReviewsStatistics.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getAnniversaryReviewsStatistics.success, (state, { payload }) => ({
    ...state,
    statistics: [...state.statistics, ...payload],
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getAnniversaryReviewsStatistics.failure, (state, { payload }) => ({
    ...state,
    statistics: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getLeadershipReviewsStatistics.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getLeadershipReviewsStatistics.success, (state, { payload }) => ({
    ...state,
    statistics: [...state.statistics, ...payload],
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getLeadershipReviewsStatistics.failure, (state, { payload }) => ({
    ...state,
    statistics: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(clearStatistics, () => initialState);
