import { createReducer } from 'typesafe-actions';

import { TotalCount } from '@pma/openapi';
import { clearCalibrationStatistics, getCalibrationStatistics } from './actions';

export type CSData = { [key: string]: TotalCount };

export type InitialStateType = {
  data: CSData;
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
  .handleAction(getCalibrationStatistics.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getCalibrationStatistics.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getCalibrationStatistics.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })
  .handleAction(clearCalibrationStatistics, () => initialState);
