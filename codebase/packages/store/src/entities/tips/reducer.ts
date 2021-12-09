import { createReducer } from 'typesafe-actions';
import { getAllTips } from './actions';

export const initialState = {
  data: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getAllTips.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getAllTips.success, (state, { payload }) => ({
    ...state,
    data: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getAllTips.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }));

