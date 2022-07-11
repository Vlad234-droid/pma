import { createReducer } from 'typesafe-actions';
import { getTopMenu, getBottomMenu } from './actions';

export const initialState = {
  data: { top: [], bottom: [] },
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getTopMenu.request, request)
  .handleAction(getTopMenu.success, (state, { payload }) => {
    return {
      ...state,
      data: {
        ...state.data,
        top: payload.data,
      },
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getTopMenu.failure, failure)

  .handleAction(getBottomMenu.request, request)
  .handleAction(getBottomMenu.success, (state, { payload }) => {
    return {
      ...state,
      data: {
        ...state.data,
        bottom: payload.data,
      },
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getBottomMenu.failure, failure);
