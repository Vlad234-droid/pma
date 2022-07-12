import { createReducer } from 'typesafe-actions';
import { getManagerReviews } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...initialState.meta } });

const success = (state, { payload }) => ({
  ...state,
  ...payload,
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
