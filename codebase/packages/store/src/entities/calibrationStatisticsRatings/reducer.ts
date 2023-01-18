import { createReducer } from 'typesafe-actions';

import { TotalCount } from '@pma/openapi';
import { clearCalibrationStatisticsRatings, getCalibrationStatisticsRatings } from './actions';

export type CSRatings = { [key: string]: TotalCount };

export type InitialStateType = {
  data: CSRatings;
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
  .handleAction(getCalibrationStatisticsRatings.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getCalibrationStatisticsRatings.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getCalibrationStatisticsRatings.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })
  .handleAction(clearCalibrationStatisticsRatings, () => initialState);
