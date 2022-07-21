import { createReducer } from 'typesafe-actions';
import { getTimeline, getUserTimeline } from './actions';

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
  .handleAction(getTimeline.request, request)
  .handleAction(getTimeline.success, success)
  .handleAction(getTimeline.failure, failure)
  .handleAction(getUserTimeline.request, request)
  .handleAction(getUserTimeline.success, success)
  .handleAction(getUserTimeline.failure, failure);
