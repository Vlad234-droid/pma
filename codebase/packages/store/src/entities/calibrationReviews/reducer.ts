import { createReducer } from 'typesafe-actions';

import { ColleagueReview } from '@pma/openapi';
import { getCalibrationUsersReviews } from './actions';

type ColleagueReviewType = Array<ColleagueReview>;

export type RatingsType = Record<
  'outstanding' | 'great' | 'satisfactory' | 'below_expected' | 'unsubmitted',
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
    unsubmitted: [],
  },
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getCalibrationUsersReviews.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getCalibrationUsersReviews.success, (state, { payload }) => {
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
  .handleAction(getCalibrationUsersReviews.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  });
