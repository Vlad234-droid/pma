import { createReducer } from 'typesafe-actions';

import { addModalError, removeModalError } from './actions';

export const initialState = {
  modalError: null,
};

export default createReducer(initialState)
  .handleAction(addModalError, (state, { payload }) => ({
    ...state,
    modalError: payload,
  }))
  .handleAction(removeModalError, (state) => ({
    ...state,
    modalError: null,
  }));
