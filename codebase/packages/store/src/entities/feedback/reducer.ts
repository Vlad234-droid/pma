import { createReducer } from 'typesafe-actions';
import { createNewFeedback } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  //current: { ...state.current, authenticated: false },
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(createNewFeedback.request, request)
  .handleAction(createNewFeedback.success, success)
  .handleAction(createNewFeedback.failure, failure);
