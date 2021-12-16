//@ts-ignore
import { createSelector } from 'reselect';
//@ts-ignore
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
    })) || []
  );
});

export const getProcessTemplateByUuidSelector = (uuid) =>
  // @ts-ignore
  createSelector(processTemplateSelector, ({ data }) => {
    return data?.filter((process) => process.uuid === uuid)?.[0];
  });

export const getType = (val) => {
  return durationOptions.find((el) => el.value === val?.[2])?.label;
};

export const getTimelinePointsByUuidSelector = (uuid) =>
  // @ts-ignore
  createSelector(processTemplateSelector, ({ data }) => {
    const processTemplate = data?.filter((process) => process.uuid === uuid)?.[0];

    return processTemplate?.cycle?.timelinePoints
      .filter((point) => point.type === 'REVIEW')
      .reduce(
        (acc, { properties }) => ({
          ...acc,
          ...Object.keys(properties).reduce((prev, key) => {
            const value = properties[key];
            if ('pm_review_duration pm_review_before_start pm_review_before_end'.includes(key)) {
              return {
                ...prev,
                [`cyclereviews__${properties?.pm_review_type}__${key}__number`]: value[1],
                [`cyclereviews__${properties?.pm_review_type}__${key}__type`]: getType(value),
              };
            }
            return {
              ...prev,
              [`cyclereviews__${properties?.pm_review_type}__${key}`]: value,
            };
          }, {}),
        }),
        {},
      );
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

export const getProcessTemplateMetaSelector = createSelector(processTemplateSelector, ({ meta }) => meta);
