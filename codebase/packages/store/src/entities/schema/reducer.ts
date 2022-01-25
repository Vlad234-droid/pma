import { createReducer } from 'typesafe-actions';
import { clearSchemaData, getSchema, updateRatingSchema } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, updating: false, updated: false, error: null },
  current: {},
  colleagueSchema: {},
};

export default createReducer(initialState)
  .handleAction(getSchema.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false, updating: false, updated: false },
  }))
  .handleAction(getSchema.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, updating: false, updated: false },
    };
  })
  .handleAction(updateRatingSchema.request, (state) => ({
    ...state,
    // not needed in loading set to true. we not running schema request
    meta: { ...state.meta, error: null, loading: false, loaded: true, updating: true, updated: false },
  }))
  .handleAction(updateRatingSchema.success, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true, updating: false, updated: true },
  }))
  .handleAction(clearSchemaData, () => initialState);
