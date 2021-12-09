//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const processTemplateSelector = (state: RootState) => state.processTemplate || {};

// @ts-ignore
export const getProcessTemplateSelector = createSelector(processTemplateSelector, ({ data }) => {
  return data?.map((process) => ({ value: process.uuid, label: process.description })) || [];
});

export const getProcessTemplateMetaSelector = createSelector(processTemplateSelector, ({ meta }) => meta);
