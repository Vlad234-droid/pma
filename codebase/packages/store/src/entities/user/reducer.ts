import { createReducer } from 'typesafe-actions';
import {
  getCurrentUser,
  createProfileAttribute,
  updateProfileAttribute,
  deleteProfileAttribute,
  getPerformanceCycles,
  getColleagueCycles,
  changeCurrentCycles,
} from './actions';

export const initialState: {
  current: {
    authenticated: boolean;
    info: any;
    metadata: { cycles: any[]; currentCycle: string; colleagueCycle: any };
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
    metadata: { cycles: [], currentCycle: 'CURRENT', colleagueCycle: {} },
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
  current: { ...state.current, metadata: { ...state.current.metadata, cycles: payload } },
});

const updateProfileAttributeSuccess = (state, { payload: [updatedAttribute] }) => {
  return {
    ...state,
    current: {
      ...state.current,
      info: {
        ...state.current.info,
        profileAttributes: state.current.info.profileAttributes.map((attribute) =>
          attribute.name === updatedAttribute.name ? updatedAttribute : attribute,
        ),
      },
    },
  };
};

const deleteProfileAttributeSuccess = (state, { payload: [{ name }] }) => ({
  ...state,
  current: {
    ...state.current,
    info: {
      ...state.current.info,
      profileAttributes: state.current.info.profileAttributes.filter((attribute) => attribute.name !== name),
    },
  },
});

const colleagueCurrentCycle = (state, { payload }) => ({
  ...state,
  current: { ...state.current, metadata: { ...state.current.metadata, currentCycle: payload } },
});

const colleagueCycles = (state, { payload }) => ({
  ...state,
  current: { ...state.current, metadata: { ...state.current.metadata, colleagueCycle: payload } },
});

export default createReducer(initialState)
  .handleAction(getCurrentUser.request, request)
  .handleAction(getCurrentUser.success, success)
  .handleAction(getCurrentUser.failure, failure)
  .handleAction(createProfileAttribute.success, profileAttributeSuccess)
  .handleAction(updateProfileAttribute.success, profileAttributeSuccess)
  .handleAction(getPerformanceCycles.success, currentUserMetadataSuccess)
  .handleAction(updateProfileAttribute.success, updateProfileAttributeSuccess)
  .handleAction(deleteProfileAttribute.success, deleteProfileAttributeSuccess)
  .handleAction(changeCurrentCycles, colleagueCurrentCycle)
  .handleAction(getColleagueCycles.success, colleagueCycles);
