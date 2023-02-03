import { createReducer } from 'typesafe-actions';
import { changeColleagueCurrentCycle, clearColleagueData, getColleagueByUuid } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
  data: {},
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload: { colleagueUuid, data } }) => {
  return {
    ...state,
    data: {
      ...state.data,
      [colleagueUuid]: {
        ...(state.data[colleagueUuid] || null),
        ...data,
      },
    },
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

const changeCycle = (state, { payload: { colleagueUuid, value } }) => ({
  ...state,
  data: {
    ...state.data,
    [colleagueUuid]: {
      ...(state.data[colleagueUuid] || {}),
      currentCycle: value,
    },
  },
});

export default createReducer(initialState)
  .handleAction(getColleagueByUuid.request, request)
  .handleAction(getColleagueByUuid.success, success)
  .handleAction(getColleagueByUuid.failure, failure)
  .handleAction(changeColleagueCurrentCycle, changeCycle)
  .handleAction(clearColleagueData, () => initialState);
