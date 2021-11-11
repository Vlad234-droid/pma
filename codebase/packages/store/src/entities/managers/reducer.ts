import { createReducer } from 'typesafe-actions';
import { getManagers } from './actions';
import { approveObjective, declineObjective } from '../objective/actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  ...payload,
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getManagers.request, request)
  .handleAction(getManagers.success, success)
  .handleAction(getManagers.failure, failure)

  .handleAction(approveObjective.request, (state, { payload }) => ({
    ...state,
    ...payload,
    meta: { ...state.meta, loading: true, error: null, loaded: false },
  }))
  .handleAction(approveObjective.success, (state, { payload }) => {
    return {
      data: state.data.map((colleague) => {
        if (colleague.uuid !== payload.uuid) return colleague;
        return { ...colleague, reviews: payload.reviews };
      }),
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })

  .handleAction(declineObjective.request, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(declineObjective.success, (state, { payload }) => {
    return {
      ...state,
      data: state.data.map((colleague) => {
        if (colleague.uuid !== payload.uuid) return colleague;
        return { ...colleague, reviews: payload.reviews };
      }),
      meta: { ...state.meta, loading: false, loaded: true },
    };
  });
