import { createReducer } from 'typesafe-actions';
import { getPreviousReviewFiles } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  ...payload,
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getPreviousReviewFiles.request, request)
  .handleAction(getPreviousReviewFiles.success, success)
  .handleAction(getPreviousReviewFiles.failure, failure);
