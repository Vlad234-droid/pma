import { createReducer } from 'typesafe-actions';
import { CalibrationSession } from '@pma/openapi';
import {
  // getCalibrationSession,
  getCalibrationSessions,
  createCalibrationSession,
  updateCalibrationSession,
  deleteCalibrationSession,
  updateCalibrationSessionMeta,
  clearCalibrationSessionData,
} from './actions';

type InitialStateType = {
  data: CalibrationSession[];
  meta: {
    loading: boolean;
    loaded: boolean;
    updating: boolean;
    updated: boolean;
    error: any;
  };
};

export const initialState: InitialStateType = {
  data: [],
  meta: { loading: false, loaded: false, error: null, updating: false, updated: false },
};

export default createReducer(initialState)
  // .handleAction(getCalibrationSession.request, (state) => {
  //   return {
  //     ...state,
  //     meta: { ...state.meta, loading: true, error: null, loaded: false },
  //   };
  // })
  // .handleAction(getCalibrationSession.success, (state, { payload }) => {
  //   return {
  //     ...state,
  //     ...payload,
  //     meta: { ...state.meta, loading: false, loaded: true },
  //   };
  // })
  // .handleAction(getCalibrationSession.failure, (state, { payload }) => {
  //   return {
  //     ...state,
  //     ...payload,
  //     meta: { ...state.meta, loading: false, loaded: true, error: payload },
  //   };
  // })

  .handleAction(getCalibrationSessions.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getCalibrationSessions.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getCalibrationSessions.failure, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })

  .handleAction(createCalibrationSession.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, updating: true, error: null, updated: false },
    };
  })
  .handleAction(createCalibrationSession.success, (state, { payload }) => {
    return {
      data: [...state.data, payload],
      meta: { ...state.meta, updating: false, updated: true },
    };
  })
  .handleAction(createCalibrationSession.failure, (state, { payload }) => {
    console.log('payload', payload);
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, updating: false, updated: true, error: payload },
    };
  })

  .handleAction(updateCalibrationSession.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, error: null, loaded: false, updating: true, updated: false },
    };
  })
  .handleAction(updateCalibrationSession.success, (state, { payload }) => ({
    ...state,
    data: state.data.map((calibrationSession) =>
      calibrationSession.uuid === payload.uuid ? payload : calibrationSession,
    ),
    meta: { ...state.meta, updating: false, updated: true },
  }))
  .handleAction(updateCalibrationSession.failure, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, updating: false, updated: true, error: payload },
    };
  })

  .handleAction(deleteCalibrationSession.request, (state) => {
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(deleteCalibrationSession.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(deleteCalibrationSession.failure, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, error: payload },
    };
  })

  .handleAction(updateCalibrationSessionMeta, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, ...payload },
  }))

  .handleAction(clearCalibrationSessionData, () => initialState);
