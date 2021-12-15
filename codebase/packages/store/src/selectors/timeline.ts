//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { ObjectiveType, ReviewType } from '@pma/client/src/config/enum';

export const timelineSelector = (state: RootState) => state.timeline || {};

export const getTimelineSelector = createSelector(timelineSelector, ({ meta, ...rest }) => {
  // @ts-ignore
  const { data } = rest;
  const descriptions = data?.map(({ description }) => description);
  const statuses = data?.map(({ status }) => status);
  const startDates = data?.map(({ startTime }) => {
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
  types: ObjectiveType[];
  excludeTypes?: ObjectiveType[];
  method: 'some' | 'every';
}) =>
  createSelector(timelineSelector, ({ meta, ...rest }) => {
    // @ts-ignore
    const { data } = rest;
    const codes = data?.map(({ code }) => code) || [];
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

export const timelineTypesAvailabilitySelector = createSelector(timelineSelector, ({ meta, ...rest }) => {
  // @ts-ignore
  const { data } = rest;
  const reviewTypes = data?.map(({ reviewType }) => reviewType);
  if (reviewTypes?.length) {
    return {
      [ReviewType.OBJECTIVE]: reviewTypes.includes(ReviewType.OBJECTIVE),
      [ReviewType.MYR]: reviewTypes.includes(ReviewType.MYR),
      [ReviewType.EYR]: reviewTypes.includes(ReviewType.EYR),
    };
  }
  return {};
});

export const getTimelineByCodeSelector = (code) =>
  createSelector(timelineSelector, ({ meta, ...rest }) => {
    // @ts-ignore
    const { data } = rest;
    return data?.find((timeline) => timeline.code === code);
  });

export const getTimelineByReviewTypeSelector = (type: ReviewType) =>
  createSelector(timelineSelector, ({ meta, ...rest }) => {
    // @ts-ignore
    const { data } = rest;
    return data?.find((timeline) => timeline.reviewType === type);
  });
