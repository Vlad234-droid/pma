import { createReducer } from 'typesafe-actions';
import { getCurrentUser, createProfileAttribute, updateProfileAttribute, getCurrentUserMetadata } from './actions';

export const initialState: {
  current: {
    authenticated: boolean;
    info: any;
    metadata: any;
  };
  meta: {
    loading: boolean;
    loaded: boolean;
    error: any;
  };
} = {
  current: {
    authenticated: false,
    info: {},
    metadata: {},
  },
  meta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  current: { ...state.current, info: payload, authenticated: true },
  meta: { ...state.meta, loading: false, loaded: true },
});

const profileAttributeSuccess = (state, { payload }) => ({
  ...state,
  current: {
    ...state.current,
    info: {
      ...state.current.info,
      profileAttributes: payload,
    },
  },
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  current: { ...state.current, authenticated: false },
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

const currentUserMetadataSuccess = (state, { payload }) => ({
  ...state,
  current: { ...state.current, ...payload },
});

export default createReducer(initialState)
  .handleAction(getCurrentUser.request, request)
  .handleAction(getCurrentUser.success, success)
  .handleAction(getCurrentUser.failure, failure)
  .handleAction(createProfileAttribute.request, request)
  .handleAction(createProfileAttribute.success, profileAttributeSuccess)
  .handleAction(updateProfileAttribute.request, request)
  .handleAction(updateProfileAttribute.success, profileAttributeSuccess)
  .handleAction(getCurrentUserMetadata.success, currentUserMetadataSuccess);
