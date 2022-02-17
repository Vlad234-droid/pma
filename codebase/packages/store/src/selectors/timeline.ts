//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { ObjectiveType, ReviewType } from '@pma/client/src/config/enum';
import { usersSelector } from './users';

export enum Type {
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
}

export const timelineSelector = (state: RootState) => state.timeline;

export const userReviewTypesSelector = createSelector(timelineSelector, ({ data }) =>
  data?.map((item: { code: string }) => item.code),
);

export const getTimelineSelector = (colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    // TODO: bugfix. extract to separate function
    const uuid = colleagueUuid === 'me' ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    const descriptions = data?.map(({ description }) => description);
    const statuses = data?.map(({ status }) => status);
    const startDates = data?.map(({ code, startTime, endTime }, index) => {
      if (code === 'Q1' || code === 'Q3') return '';
      const date = new Date(index === 0 ? startTime : endTime);
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
  colleagueUuid: string;
  types: ObjectiveType[];
  excludeTypes?: ObjectiveType[];
  method: 'some' | 'every';
}) =>
  createSelector(usersSelector, timelineSelector, ({ meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === 'me' ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
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

export const timelineTypesAvailabilitySelector = (colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === 'me' ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
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

export const getTimelineByCodeSelector = (code, colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === 'me' ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    return data?.find((timeline) => timeline.code === code);
  });

export const getTimelineByReviewTypeSelector = (type: ReviewType, colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === 'me' ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    return data?.find((timeline) => timeline.reviewType === type);
  });
