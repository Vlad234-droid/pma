//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType } from '@pma/client/src/config/enum';
import { usersSelector } from './users';

export enum Type {
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
}

export const USER = {
  current: 'me',
};

export const timelineSelector = (state: RootState) => state.timeline;

export const userReviewTypesSelector = createSelector(timelineSelector, ({ data }) =>
  data?.map((item: { code: string }) => item.code),
);

export const timelinesExistSelector = (colleagueUuid) =>
  createSelector(timelineSelector, (timelines) => !!timelines[colleagueUuid]?.length);

export const timelinesMetaSelector = () => createSelector(timelineSelector, (timelines) => timelines.meta);

export const getTimelineSelector = (colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    // TODO: bugfix. extract to separate function
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    const codes = data?.map(({ code }) => code);
    const types = data?.map(({ type }) => type);
    const descriptions = data?.map(({ description }) => description);
    const summaryStatuses = data?.map(({ summaryStatus }) => summaryStatus);
    const startDates = data?.map(({ code, startTime, endTime }, index) => {
      if (code === 'Q1' || code === 'Q3') return '';
      const date = new Date(index === 0 ? startTime : endTime);
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    });
    return { descriptions, startDates, summaryStatuses, codes, types };
  });

export const getTimelineMetaSelector = createSelector(timelineSelector, ({ meta }) => meta);

export const hasTimelineAccessesSelector = ({
  types,
  excludeTypes = [],
  method,
}: {
  colleagueUuid: string;
  types: ReviewType[];
  excludeTypes?: ReviewType[];
  method: 'some' | 'every';
}) =>
  createSelector(usersSelector, timelineSelector, ({ meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
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

// todo think about remove this selector
export const timelineTypesAvailabilitySelector = (colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    const reviewTypes = data?.map(({ reviewType }) => reviewType);
    if (reviewTypes?.length) {
      return {
        [ReviewType.QUARTER]: reviewTypes.includes(ReviewType.QUARTER),
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
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    return data?.find((timeline) => timeline.code === code);
  });

export const getTimelineByReviewTypeSelector = (type: ReviewType, colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    return data?.find((timeline) => timeline.reviewType === type);
  });

export const getTimelinesByReviewTypeSelector = (type: ReviewType, colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    return data?.filter((timeline) => timeline.reviewType === type);
  });
