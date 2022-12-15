import { createReducer } from 'typesafe-actions';
import {
  saveCalibrationReview,
  updateCalibrationReview,
  getCalibrationReview,
  clearCalibrationReview,
} from './actions';

export type InitialStateType = {
  data: any;
  meta: {
    loading: boolean;
    loaded: boolean;
    updating: boolean;
    updated: boolean;
    error: any;
  };
};

export const initialState: InitialStateType = {
  data: {},
  meta: { loading: false, loaded: false, error: null, updating: false, updated: false },
};

export default createReducer(initialState)
  .handleAction(getCalibrationReview.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, loaded: false },
    };
  })
  .handleAction(getCalibrationReview.success, (state, { payload }) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload,
      },
      meta: { ...state.meta, loading: false, loaded: true, updated: false },
    };
  })
  .handleAction(getCalibrationReview.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })
  .handleAction(saveCalibrationReview.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, updating: true, updated: false },
    };
  })
  .handleAction(saveCalibrationReview.success, (state, { payload }) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload,
      },
      meta: { ...state.meta, updating: false, updated: true },
    };
  })
  .handleAction(saveCalibrationReview.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, updating: false, updated: false, error: payload },
    };
  })
  .handleAction(updateCalibrationReview.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, updating: true, updated: false },
    };
  })
  .handleAction(updateCalibrationReview.success, (state, { payload }) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload,
      },
      meta: { ...state.meta, updating: false, updated: true },
    };
  })
  .handleAction(updateCalibrationReview.failure, (state, { payload }) => {
    return {
      ...state,
      meta: { ...state.meta, updating: false, updated: false, error: payload },
    };
  })
  .handleAction(clearCalibrationReview, () => initialState);
