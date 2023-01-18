import { createReducer } from 'typesafe-actions';
import { ColleagueFilterOptions } from '@pma/openapi';

import { getColleagueFilter, clearColleagueFilter, getReportingFilters } from './actions';

export type InitialStateType = {
  data: ColleagueFilterOptions;
  meta: {
    loading: boolean;
    loaded: boolean;
    error: any;
  };
};

export const initialState: InitialStateType = {
  data: {},
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getColleagueFilter.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getColleagueFilter.success, (state, { payload }) => {
    return {
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getReportingFilters.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getReportingFilters.success, (state, { payload }) => {
    return {
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(clearColleagueFilter, () => initialState);
