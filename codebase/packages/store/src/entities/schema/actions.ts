import { createAction, createAsyncAction } from 'typesafe-actions';

export const getSchema = createAsyncAction(
  'schema/FETCH_REQUEST',
  'schema/FETCH_SUCCESS',
  'schema/FETCH_FAILURE',
  'schema/CANCEL',
)<{ colleagueUuid: string }, any, Error, undefined>();

export const clearSchemaData = createAction('schema/CLEAR')<undefined>();

export const Actions = {
  getSchema: getSchema.request,
  clearSchemaData,
};
