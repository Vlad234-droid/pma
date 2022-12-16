import { createReducer } from 'typesafe-actions';
import { getManagerReviews, getManagerCalibrations } from './actions';

export const initialState = {
  reviews: {
    data: {},
    meta: { loading: false, loaded: false, error: null },
  },
  calibrations: {
    data: {},
    meta: { loading: false, loaded: false, error: null },
  },
};

const managerReviewsRequest = (state) => ({
  ...state,
  reviews: {
    data: { ...state.reviews.data },
    meta: { ...state.meta, loading: true, loaded: false },
  },
});

const managerReviewsSuccess = (state, { payload }) => ({
  ...state,
  reviews: {
    data: {
      ...state.reviews.data,
      ...payload,
    },
    meta: { ...state.meta, loading: false, loaded: true },
  },
});

const managerReviewsFailure = (state, { payload }) => ({
  ...state,
  reviews: {
    data: { ...state.reviews.data },
    meta: { ...state.meta, loading: false, loaded: false, error: payload },
  },
});

const managerCalibrationsRequest = (state) => ({
  ...state,
  calibrations: {
    data: { ...state.calibrations.data },
    meta: { ...state.meta, loading: true, loaded: false },
  },
});

const managerCalibrationsSuccess = (state, { payload }) => ({
  ...state,
  calibrations: {
    data: {
      ...state.calibrations.data,
      ...payload,
    },
    meta: { ...state.meta, loading: false, loaded: true },
  },
});

const managerCalibrationsFailure = (state, { payload }) => ({
  ...state,
  calibrations: {
    data: { ...state.calibrations.data },
    meta: { ...state.meta, loading: false, loaded: false, error: payload },
  },
});

export default createReducer(initialState)
  .handleAction(getManagerReviews.request, managerReviewsRequest)
  .handleAction(getManagerReviews.success, managerReviewsSuccess)
  .handleAction(getManagerReviews.failure, managerReviewsFailure)
  .handleAction(getManagerCalibrations.request, managerCalibrationsRequest)
  .handleAction(getManagerCalibrations.success, managerCalibrationsSuccess)
  .handleAction(getManagerCalibrations.failure, managerCalibrationsFailure);
