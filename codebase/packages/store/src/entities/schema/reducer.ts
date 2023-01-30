import { createReducer } from 'typesafe-actions';
import { clearSchemaData, getSchema, getSchemaWithColleaguePermission, getColleagueSchema } from './actions';

export type InitialStateType = {
  meta: { loading: boolean; loaded: boolean; updating: boolean; updated: boolean; error: any };
  current: { metadata?: any; forms?: any[] };
  colleagueSchema: any;
  colleagueMeta: {};
};

export const initialState: InitialStateType = {
  meta: { loading: false, loaded: false, updating: false, updated: false, error: null },
  current: {},
  colleagueSchema: {},
  colleagueMeta: {},
};

export default createReducer(initialState)
  .handleAction(getSchema.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false, updating: false, updated: false },
  }))
  .handleAction(getSchema.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, updating: false, updated: false },
    };
  })
  .handleAction(getSchema.request, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, error: payload, loaded: false },
  }))
  .handleAction(getSchemaWithColleaguePermission.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true, error: null, loaded: false, updating: false, updated: false },
  }))
  .handleAction(getSchemaWithColleaguePermission.success, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      meta: { ...state.meta, loading: false, loaded: true, updating: false, updated: false },
    };
  })
  .handleAction(getColleagueSchema.success, (state, { payload }) => ({
    ...state,
    colleagueMeta: {
      ...state.colleagueMeta,
      [payload.colleagueUuid]: { loading: false, loaded: true, updating: false, updated: false },
    },
    colleagueSchema: {
      ...state.colleagueSchema,
      [payload.colleagueUuid]: {
        ...state.colleagueSchema[payload.colleagueUuid],
        ...payload[payload.colleagueUuid],
      },
    },
  }))
  .handleAction(clearSchemaData, () => initialState);
