import { createReducer } from 'typesafe-actions';
import {
  getProcessTemplate,
  getProcessTemplateMetadata,
  deleteProcessTemplate,
  uploadProcessTemplate,
} from './actions';

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

const metadataRequest = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const metadataSuccess = (state, { payload }) => {
  return {
    data: state.data.map((template) => {
      if (template.uuid !== payload.fileUuid) return template;
      // todo move to selector
      return { ...template, cycle: payload.data?.metadata?.cycle, forms: payload.data?.forms };
    }),
    meta: { ...state.meta, loading: false, loaded: true },
  };
};

const metadataFailure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

export default createReducer(initialState)
  .handleAction(getProcessTemplate.request, request)
  .handleAction(getProcessTemplate.success, success)
  .handleAction(getProcessTemplate.failure, failure)
  .handleAction(getProcessTemplateMetadata.request, metadataRequest)
  .handleAction(getProcessTemplateMetadata.success, metadataSuccess)
  .handleAction(getProcessTemplateMetadata.failure, metadataFailure)
  .handleAction(deleteProcessTemplate.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(deleteProcessTemplate.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(deleteProcessTemplate.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(uploadProcessTemplate.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(uploadProcessTemplate.success, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }));
