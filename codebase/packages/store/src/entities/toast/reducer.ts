import { createReducer } from 'typesafe-actions';

import { addToast, removeToast } from './actions';

export const initialState = {
  data: [],
};

export default createReducer(initialState)
  .handleAction(addToast, (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  }))
  .handleAction(removeToast, (state, { payload }) => ({
    ...state,
    data: state.data.filter((toast) => toast.id !== payload),
  }));
