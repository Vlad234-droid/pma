import { createAction, createAsyncAction } from 'typesafe-actions';

export const getSchema = createAsyncAction(
  'schema/FETCH_REQUEST',
  'schema/FETCH_SUCCESS',
  'schema/FETCH_FAILURE',
  'schema/CANCEL',
)<
  { colleagueUuid: string; cycleUuid: string; includeForms?: boolean },
  { current: any; colleagueSchema?: any },
  Error,
  undefined
>();

export const getColleagueSchema = createAsyncAction(
  'schema/colleague/FETCH_REQUEST',
  'schema/colleague/FETCH_SUCCESS',
  'schema/colleague/FETCH_FAILURE',
  'schema/colleague/CANCEL',
)<{ colleagueUuid: string; cycleUuid: string; includeForms?: boolean }, any, Error, undefined>();

export const getSchemaWithColleaguePermission = createAsyncAction(
  'schema/permission/FETCH_REQUEST',
  'schema/permission/FETCH_SUCCESS',
  'schema/permission/FETCH_FAILURE',
  'schema/permission/CANCEL',
)<{ colleagueUuid: string; includeForms?: boolean }, { current: any; colleagueSchema?: any }, Error, undefined>();

export const clearSchemaData = createAction('schema/CLEAR')<undefined>();

export const Actions = {
  getSchema: getSchema.request,
  getColleagueSchema: getColleagueSchema.request,
  getSchemaWithColleaguePermission: getSchemaWithColleaguePermission.request,
  clearSchemaData,
};
