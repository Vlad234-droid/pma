import { ActionHandler } from '../../config/types';
import { Action, createReducer } from 'typesafe-actions';
import { getTimeline, getUserTimeline } from './actions';
import { State, SuccessPayload, ErrorPayload } from './types';

export const initialState: State = {
  data: {},
  meta: { loading: false, loaded: false, error: null },
};

const request: ActionHandler<State> = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success: ActionHandler<State, SuccessPayload> = (state, { payload }) => ({
  ...state,
  data: {
    ...state.data,
    [payload.colleagueUuid]: {
      ...(state.data?.[payload.colleagueUuid] || {}),
      [payload.cycleUuid]: payload.data,
    },
  },
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure: ActionHandler<State, ErrorPayload> = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer<State, Action<string>>(initialState)
  .handleAction(getTimeline.request, request)
  .handleAction(getTimeline.success, success)
  .handleAction(getTimeline.failure, failure)
  .handleAction(getUserTimeline.request, request)
  .handleAction(getUserTimeline.success, success)
  .handleAction(getUserTimeline.failure, failure);
