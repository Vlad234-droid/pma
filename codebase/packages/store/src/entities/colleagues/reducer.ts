import { createReducer } from 'typesafe-actions';
import { getColleagues, clearGettedColleagues } from './actions';

export const initialState = {
  finded_colleagues: [],
  meta: { loading: false, loaded: false, error: null },
  profile: [],
};

export default createReducer(initialState)
  .handleAction(getColleagues.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getColleagues.success, (state, { payload }) => ({
    ...state,
    finded_colleagues: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getColleagues.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(clearGettedColleagues, (state) => ({
    ...state,
    finded_colleagues: [],
  }));
