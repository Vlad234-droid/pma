import { createReducer } from 'typesafe-actions';
import { getMessagesCount } from './actions';

export const initialState = {
  currentCount: 0,
  meta: {
    loading: false,
    loaded: false,
    error: null,
  },
};

export default createReducer(initialState)
  .handleAction(getMessagesCount.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getMessagesCount.success, (state, { payload }) => ({
    ...state,
    currentCount: payload.count,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getMessagesCount.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }));
