import { createReducer } from 'typesafe-actions';
import { getHelpFaqUrls, getHelpFaqs } from './actions';

export const initialState = {
  urls: {},
  data: {},
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getHelpFaqUrls.request, request)
  .handleAction(getHelpFaqUrls.success, (state, { payload }) => {
    return {
      ...state,
      urls: payload.data,
      meta: { ...state.meta, loading: false, loaded: true },
    };
  })
  .handleAction(getHelpFaqUrls.failure, failure)
  .handleAction(getHelpFaqs.request, request)
  .handleAction(getHelpFaqs.success, success)
  .handleAction(getHelpFaqs.failure, failure);
