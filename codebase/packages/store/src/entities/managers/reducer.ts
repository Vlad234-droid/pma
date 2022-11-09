import { createReducer } from 'typesafe-actions';
import { getManagerReviews } from './actions';

export const initialState = {
  data: {},
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, loaded: false } });

const success = (state, { payload }) => ({
  ...state,
  data: {
    ...state.data,
    ...payload,
  },
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: false, error: payload },
});

export default createReducer(initialState)
  .handleAction(getManagerReviews.request, request)
  .handleAction(getManagerReviews.success, success)
  .handleAction(getManagerReviews.failure, failure);
