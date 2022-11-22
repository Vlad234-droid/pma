import { createReducer } from 'typesafe-actions';
import { getCompletedReviews } from './actions';

export type InitialStateType = {
  data: [];
  meta: {
    loading: boolean;
    loaded: boolean;
    updating: boolean;
    updated: boolean;
    error: any;
  };
};

export const initialState: InitialStateType = {
  data: [],
  meta: { loading: false, loaded: false, error: null, updating: false, updated: false },
};

export default createReducer(initialState)
  .handleAction(getCompletedReviews.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getCompletedReviews.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getCompletedReviews.failure, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  });
