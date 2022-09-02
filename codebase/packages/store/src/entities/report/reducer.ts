import { createReducer } from 'typesafe-actions';
import {
  clearStatistics,
  getLimitedObjectivesReport,
  getLeadershipReviewsReport,
  getAnniversaryReviewsReport,
  getFeedbacksReport,
  getReviewReport,
  getOverallRatingsReport,
  getNewToBusinessReport,
} from './actions';

export const initialState = {
  limitedObjectiveReports: [],
  review: [],
  overallRatings: [],
  newToBusiness: [],
  anniversaryReviews: [],
  leadershipReviews: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getLeadershipReviewsReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getLeadershipReviewsReport.success, (state, { payload }) => ({
    ...state,
    leadershipReviews: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getLeadershipReviewsReport.failure, (state, { payload }) => ({
    ...state,
    leadershipReviews: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getAnniversaryReviewsReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getAnniversaryReviewsReport.success, (state, { payload }) => ({
    ...state,
    anniversaryReviews: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getAnniversaryReviewsReport.failure, (state, { payload }) => ({
    ...state,
    anniversaryReviews: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getFeedbacksReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getFeedbacksReport.success, (state, { payload }) => ({
    ...state,
    feedbacks: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getFeedbacksReport.failure, (state, { payload }) => ({
    ...state,
    feedbacks: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getReviewReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getReviewReport.success, (state, { payload }) => ({
    ...state,
    review: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getReviewReport.failure, (state, { payload }) => ({
    ...state,
    review: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getOverallRatingsReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getOverallRatingsReport.success, (state, { payload }) => ({
    ...state,
    overallRatings: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getOverallRatingsReport.failure, (state, { payload }) => ({
    ...state,
    overallRatings: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getNewToBusinessReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getNewToBusinessReport.success, (state, { payload }) => ({
    ...state,
    newToBusiness: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getNewToBusinessReport.failure, (state, { payload }) => ({
    ...state,
    newToBusiness: [],
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getLimitedObjectivesReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getLimitedObjectivesReport.success, (state, { payload }) => ({
    ...state,
    limitedObjectiveReports: [...state.limitedObjectiveReports, ...payload],
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getLimitedObjectivesReport.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(clearStatistics, () => initialState);
