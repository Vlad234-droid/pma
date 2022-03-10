//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const durationOptions = [
  { value: 'D', label: 'days' },
  { value: 'W', label: 'weeks' },
];

export const processTemplateSelector = (state: RootState) => state.processTemplate || {};

// @ts-ignore
export const getProcessTemplateSelector = createSelector(processTemplateSelector, ({ data }) => {
  return (
    data?.map((process) => ({
      value: process.uuid,
      label: process.description,
      createdTime: process.createdTime,
      fileName: process.fileName,
      path: process.path,
      version: process.version,
    })) || []
  );
});

export const getProcessTemplateByUuidSelector = (uuid) =>
  // @ts-ignore
  createSelector(processTemplateSelector, ({ data }) => {
    return data?.filter((process) => process.uuid === uuid)?.[0];
  });

export const getTimelinePointsByUuidSelector = (uuid) =>
  // @ts-ignore
  createSelector(processTemplateSelector, ({ data }) => {
    const processTemplate = data?.filter((process) => process.uuid === uuid)?.[0];
    return processTemplate?.cycle?.timelinePoints.filter((point) => point.type === 'REVIEW');
  });

export const getTimelinePointsReviewTypesByUuidSelector = (uuid) =>
  // @ts-ignore
  createSelector(processTemplateSelector, ({ data }) => {
    const processTemplate = data?.filter((process) => process.uuid === uuid)?.[0];
    return processTemplate?.cycle?.timelinePoints
      .filter((point) => point.type === 'REVIEW')
      .map((point) => {
        return point?.properties?.pm_review_type;
      });
  });

export const getFormsByProcessTemplateUuidSelector = (uuid) =>
  // @ts-ignore
  createSelector(processTemplateSelector, ({ data }) => {
    // @ts-ignore
    const processTemplate = data?.filter((process) => process.uuid === uuid)?.[0];
    // @ts-ignore
    return processTemplate?.cycle?.timelinePoints
      .filter((point) => point.type === 'REVIEW')
      .map((point) => {
        const form = processTemplate?.forms.find((form) => form.id === point.form.id);
        return { ...JSON.parse(form?.json), displayName: point?.code };
      });
  });
