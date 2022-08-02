import { createAction, createAsyncAction } from 'typesafe-actions';

export const getSchema = createAsyncAction(
  'schema/FETCH_REQUEST',
  'schema/FETCH_SUCCESS',
  'schema/FETCH_FAILURE',
  'schema/CANCEL',
)<{ colleagueUuid: string; includeForms?: boolean }, { current: any; colleagueSchema?: any }, Error, undefined>();

export const getSchemaWithColleaguePermission = createAsyncAction(
  'schema/permission/FETCH_REQUEST',
  'schema/permission/FETCH_SUCCESS',
  'schema/permission/FETCH_FAILURE',
  'schema/permission/CANCEL',
)<{ colleagueUuid: string; includeForms?: boolean }, { current: any; colleagueSchema?: any }, Error, undefined>();

export const clearSchemaData = createAction('schema/CLEAR')<undefined>();

export const Actions = {
  getSchema: getSchema.request,
  getSchemaWithColleaguePermission: getSchemaWithColleaguePermission.request,
  clearSchemaData,
};
