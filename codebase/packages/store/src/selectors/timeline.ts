import { createSelector } from 'reselect';
// @ts-ignore
import { RootState } from 'typesafe-actions';

export enum Type {
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
}

export const timelineSelector = (state: RootState) => state.timeline;

export const userReviewTypesSelector = createSelector(timelineSelector, ({ data }) =>
  data?.map((item: { code: string }) => item.code),
);

export const getTimelineSelector = createSelector(timelineSelector, ({ data }) => {
  const descriptions = data?.map(({ description }) => description);
  const statuses = data?.map(({ status }) => status);
  const startDates = data?.map(({ code, startTime }) => {
    if (code === 'Q1' || code === 'Q3') return '';
    const date = new Date(startTime);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  });
  return { descriptions, startDates, statuses };
});

export const getTimelineMetaSelector = createSelector(timelineSelector, ({ meta }) => meta);

export const hasTimelineAccessesSelector = ({
  types,
  excludeTypes = [],
  method,
}: {
  types: Type[];
  excludeTypes?: Type[];
  method: 'some' | 'every';
}) =>
  createSelector(timelineSelector, ({ data }) => {
    const codes: Array<Type> = data?.map(({ code }) => code) || [];
    let canShow = false;
    if (method === 'every' && codes?.length) {
      canShow = types.every((type) => codes.includes(type));
    } else if (method === 'some' && codes) {
      canShow = types.some((type) => codes.includes(type));
    }

    if (canShow && excludeTypes?.length) {
      canShow = excludeTypes.every((type) => !codes.includes(type));
    }

    return canShow;
  });

export const timelineTypesAvailabilitySelector = createSelector(timelineSelector, ({ data }) => {
  const reviewTypes = data?.map(({ reviewType }: { reviewType: string }) => reviewType);
  if (reviewTypes?.length) {
    return {
      [Type.OBJECTIVE]: reviewTypes.includes(Type.OBJECTIVE),
      [Type.MYR]: reviewTypes.includes(Type.MYR),
      [Type.EYR]: reviewTypes.includes(Type.EYR),
    };
  }
  return {};
});

export const getTimelineByCodeSelector = (code) =>
  createSelector(timelineSelector, ({ data }) => {
    return data?.find((timeline: { code: string }) => timeline.code === code);
  });

export const getTimelineByReviewTypeSelector = (type: string) =>
  createSelector(timelineSelector, ({ data }) => {
    return data?.find((timeline: { reviewType: string }) => timeline.reviewType === type);
  });
