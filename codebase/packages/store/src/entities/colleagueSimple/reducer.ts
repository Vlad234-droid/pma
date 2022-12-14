import { createReducer } from 'typesafe-actions';
import { ColleagueSimple } from '@pma/openapi';

import { getColleagueSimple, getSessionColleagueSimple, clearColleagueSimple } from './actions';

export type InitialStateType = {
  data: ColleagueSimple[];
  meta: {
    loading: boolean;
    loaded: boolean;
    error: any;
  };
};

export const initialState: InitialStateType = {
  data: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getColleagueSimple.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getColleagueSimple.success, (state, { payload }) => {
    return {
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getSessionColleagueSimple.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getSessionColleagueSimple.success, (state, { payload }) => {
    return {
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(clearColleagueSimple, () => initialState);
