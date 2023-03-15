import { createReducer } from 'typesafe-actions';
import { getColleagues, clearColleagueList, changeColleaguesMeta } from './actions';

export const initialState = {
  list: [],
  meta: { loading: false, loaded: false, error: null, updated: false },
};

export default createReducer(initialState)
  .handleAction(getColleagues.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getColleagues.success, (state, { payload }) => ({
    ...state,
    list: payload,
    meta: { ...state.meta, loading: false, loaded: true, updated: true },
  }))
  .handleAction(getColleagues.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(clearColleagueList, (state) => ({
    ...state,
    list: [],
  }))
  .handleAction(changeColleaguesMeta, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, ...payload },
  }));
