//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const durationOptions = [
  { value: 'D', label: 'days' },
  { value: 'W', label: 'weeks' },
];

export const processTemplateSelector = (state: RootState) => state.processTemplate.data;

export const getProcessTemplateMetaSelector = createSelector(processTemplateSelector, (template) => template.meta);

export const getProcessTemplateSelector = createSelector(processTemplateSelector, (data) => {
  return (
    data?.map((process: any) => ({
      uuid: process.uuid,
      createdBy: process.createdBy,
      description: process.description,
      createdTime: process.createdTime,
      fileName: process.fileName,
      path: process.path,
      version: process.version,
    })) || []
  );
});

export const processTemplateByUuidSelector = (templateUuid) =>
  createSelector(processTemplateSelector, (data) => {
    return data.find(({ uuid }) => templateUuid === uuid);
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
        const { json, code } = processTemplate?.forms.find((form) => form.id === point.form.id);
        return { ...JSON.parse(json), displayName: code };
      });
  });
