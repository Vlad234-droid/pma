import { createAsyncAction } from 'typesafe-actions';

export const getHelpFaqUrls = createAsyncAction(
  'help-faq-urls/REQUEST',
  'help-faq-urls/SUCCESS',
  'help-faq-urls/FAILURE',
  'help-faq-urls/CANCEL',
)<undefined, any, Error, undefined>();

export const Actions = {
  getHelpFaqUrls: getHelpFaqUrls.request,
};
