import { createAsyncAction, createAction } from 'typesafe-actions';

export const getSchema = createAsyncAction(
  'schema/FETCH_REQUEST',
  'schema/FETCH_SUCCESS',
  'schema/FETCH_FAILURE',
  'schema/CANCEL',
)<undefined, any, Error, undefined>();

export const clearSchemaData = createAction('schema/CLEAR')<undefined>();

export const Actions = {
  getSchema: getSchema.request,
  clearSchemaData,
};
