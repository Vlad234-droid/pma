import { createReducer } from 'typesafe-actions';
import { getObjectivesReport, getObjectivesStatistics } from './actions';

export const initialState = {
  objectiveReports: [],
  objectiveStatistics: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getObjectivesReport.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getObjectivesReport.success, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
    objectiveReports: payload,
  }))
  .handleAction(getObjectivesReport.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(getObjectivesStatistics.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getObjectivesStatistics.success, (state, { payload }) => ({
    ...state,
    objectiveStatistics: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(getObjectivesStatistics.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }));
