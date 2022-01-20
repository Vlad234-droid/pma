import { createReducer } from 'typesafe-actions';
import { getSchema } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getSchema.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(getSchema.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  });
