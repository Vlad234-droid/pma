import { createReducer } from 'typesafe-actions';
import { getAllTips, getTipHistory, getTipByUuid } from './actions';

export const initialState = {
  tipsList: [],
  viewHistory: [],
  currentTip: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(getAllTips.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getAllTips.success, (state, { payload }) => {
    return {
      ...state,
      tipsList: payload,
      meta: { ...state.meta, loading: false, loaded: true },
    }
  })
  .handleAction(getAllTips.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getTipHistory.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getTipHistory.success, (state, { payload }) => {
    return {
      ...state,
      viewHistory: payload,
      meta: { ...state.meta, loading: false, loaded: true },
    }
  })
  .handleAction(getTipHistory.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(getTipByUuid.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getTipByUuid.success, (state, { payload }) => {
    return {
      ...state,
      currentTip: payload,
      meta: { ...state.meta, loading: false, loaded: true },
    }
  })
  .handleAction(getTipByUuid.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))


