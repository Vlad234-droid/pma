import { createReducer } from 'typesafe-actions';

import { addTest } from './actions';

export const initialState = {
  data: [],
};

export default createReducer(initialState).handleAction(addTest, (state, { payload }) => ({
  ...state,
  data: [...state.data, payload],
}));
