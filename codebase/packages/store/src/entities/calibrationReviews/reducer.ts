import { createReducer } from 'typesafe-actions';

import { getCalibrationUsersReviews } from './actions';

export const initialState = {
  data: {
    outstanding: [],
    great: [],
    satisfactory: [],
    below_expected: [],
    unsubmitted: [],
  },
  meta: { loading: false, loaded: false, error: null, updating: false, updated: false },
};

export default createReducer(initialState)
  .handleAction(getCalibrationUsersReviews.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getCalibrationUsersReviews.success, (state, { payload }) => {
    const { type, reviews } = payload;
    return {
      data: {
        ...state.data,
        [type]: reviews,
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
