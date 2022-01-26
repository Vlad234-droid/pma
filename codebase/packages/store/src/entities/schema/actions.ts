import { createAction, createAsyncAction } from 'typesafe-actions';
import { ReviewType } from '@pma/client/src/config/enum';

export const getSchema = createAsyncAction(
  'schema/FETCH_REQUEST',
  'schema/FETCH_SUCCESS',
  'schema/FETCH_FAILURE',
  'schema/CANCEL',
)<{ colleagueUuid: string }, { current: any; colleagueSchema?: any }, Error, undefined>();

export const updateRatingSchema = createAsyncAction(
  'schema/rating/UPDATE_REQUEST',
  'schema/rating/UPDATE_SUCCESS',
  'schema/rating/UPDATE_FAILURE',
)<{ type: ReviewType; fields: any }, any, Error, undefined>();

export const clearSchemaData = createAction('schema/CLEAR')<undefined>();

export const Actions = {
  getSchema: getSchema.request,
  updateRatingSchema: updateRatingSchema.request,
  clearSchemaData,
};
