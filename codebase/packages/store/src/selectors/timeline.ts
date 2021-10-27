//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const timelineSelector = (state: RootState) => state.timeline || {};

export const getTimelineSelector = createSelector(timelineSelector, ({ meta, ...rest }) => {
  // @ts-ignore
  const { data } = rest;
  const descriptions = data?.map(({ description }) => description);
  const statuses = data?.map(({ status }) => status);
  const startDates = data?.map(({ startDate }) => {
    const date = new Date(startDate);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  });
  return { descriptions, startDates, statuses };
});

export const getTimelineMetaSelector = createSelector(timelineSelector, ({ meta }) => meta);
