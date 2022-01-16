import { createReducer } from 'typesafe-actions';
import { getColleagues, clearColleagueList } from './actions';

export const initialState = {
  list: [],
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
    list: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getColleagues.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(clearColleagueList, (state) => ({
    ...state,
    list: [],
  }));
