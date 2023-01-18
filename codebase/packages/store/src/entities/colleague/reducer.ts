import { createReducer } from 'typesafe-actions';
import { clearColleagueData, getColleagueByUuid } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
  colleague: {},
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => {
  return {
    ...state,
    colleague: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const failure = (state, { payload }) => ({
  ...state,
  colleague: {},
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getColleagueByUuid.request, request)
  .handleAction(getColleagueByUuid.success, success)
  .handleAction(getColleagueByUuid.failure, failure)
  .handleAction(clearColleagueData, () => initialState);
