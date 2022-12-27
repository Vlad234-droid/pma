import { createReducer } from 'typesafe-actions';

import { ColleagueReview } from '@pma/openapi';
import { clearCalibrationReviewsData, getUserCalibrationReviews, uploadCalibrationUsersReviews } from './actions';

type ColleagueReviewType = Array<ColleagueReview>;

export type RatingsType = Record<
  'outstanding' | 'great' | 'satisfactory' | 'below_expected' | 'unsubmitted' | 'new_to_business',
  ColleagueReviewType
>;

export type InitialStateType = {
  data: RatingsType;
  meta: {
    loading: boolean;
    loaded: boolean;
    error: any;
  };
};

export const initialState: InitialStateType = {
  data: {
    outstanding: [],
    great: [],
    satisfactory: [],
    below_expected: [],
    new_to_business: [],
    unsubmitted: [],
  },
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getUserCalibrationReviews.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getUserCalibrationReviews.success, (state, { payload }) => {
    const { rating, data } = payload;
    return {
      ...state,
      data: {
        ...state.data,
        [rating]: data,
      },
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getUserCalibrationReviews.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })
  .handleAction(uploadCalibrationUsersReviews.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(uploadCalibrationUsersReviews.success, (state, { payload }) => ({
    ...state,
    data: {
      ...state.data,
      [payload.rating]: [...state.data[payload.rating], ...payload.data],
    },
    meta: { ...state.meta, loading: false, error: null, loaded: true },
  }))
  .handleAction(uploadCalibrationUsersReviews.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })
  .handleAction(clearCalibrationReviewsData, () => initialState);
