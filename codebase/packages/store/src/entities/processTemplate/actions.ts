import { createAsyncAction } from 'typesafe-actions';

export const getProcessTemplate = createAsyncAction(
  'processTemplate/REQUEST',
  'processTemplate/SUCCESS',
  'processTemplate/FAILURE',
  'processTemplate/CANCEL',
)<undefined, any, Error, undefined>();

export const getProcessTemplateMetadata = createAsyncAction(
  'processTemplate/METADATA_REQUEST',
  'processTemplate/METADATA_SUCCESS',
  'processTemplate/METADATA_FAILURE',
  'processTemplate/METADATA_CANCEL',
)<any, any, Error, undefined>();

export const Actions = {
  getProcessTemplate: getProcessTemplate.request,
  getProcessTemplateMetadata: getProcessTemplateMetadata.request,
};
