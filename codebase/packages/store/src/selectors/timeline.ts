//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType } from '@pma/client/src/config/enum';
import { usersSelector } from './users';

export enum Type {
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
  START_CYCLE = 'START_CYCLE',
}

export const USER = {
  current: 'me',
};

export const timelineSelector = (state: RootState) => state.timeline;

export const userReviewTypesSelector = (uuid) =>
  createSelector(timelineSelector, (timeline) => timeline[uuid]?.map((item: { code: string }) => item.code));

export const timelinesExistSelector = (colleagueUuid) =>
  createSelector(timelineSelector, (timelines) => !!timelines[colleagueUuid]?.length);

export const timelineStartedSelector = (colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    return !data?.some((item) => item.code === Type.START_CYCLE && item.code !== Type.OBJECTIVE);
  });

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

export const getBankTimelineSelector = (colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];

    const hasMYR = data?.some((element) => element.code === 'MYR');
    const quarterDescription = data?.find((element) => element.code === 'Q3')?.description;
    const result = { codes: [], types: [], summaryStatuses: [], descriptions: [], startDates: [], currentStep: 0 };
    let currentStep = 0;
    let step = 0;

    const getDesc = (code, description) => (code !== 'MYR' ? description : `${description} / ${quarterDescription}`);
    const getStartDate = (startTime, endTime, index) => getDateString(new Date(index === 0 ? startTime : endTime));
    const getDateString = (date) => `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    const isActive = (status) => status !== 'STARTED' && status !== 'NOT_STARTED';
    const getStep = (step) => (step <= 0 ? 0 : step - 1);

    data?.map(({ code, type, summaryStatus, description, startTime, endTime }, index) => {
      const { codes, types, summaryStatuses, descriptions, startDates } = result as any;

      if (code !== 'Q3' || !hasMYR) {
        codes.push(code);
        types.push(type);
        summaryStatuses.push(summaryStatus);
        descriptions.push(getDesc(code, description));
        startDates.push(getStartDate(startTime, endTime, index));
        step++;
      }

      if ((code === 'MYR' || code === 'EYR') && isActive(summaryStatus)) {
        currentStep = step;
      }
    });

    return { ...result, currentStep: getStep(currentStep) };
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

export const getActiveTimelineByReviewTypeSelector = (type: ReviewType, colleagueUuid) =>
  createSelector(usersSelector, timelineSelector, (user, { meta, ...rest }) => {
    // @ts-ignore
    const uuid = colleagueUuid === USER.current ? user?.current.info.data.colleague.colleagueUUID : colleagueUuid;
    const data = rest?.[uuid];
    return data?.find((timeline) => timeline.reviewType === type && timeline.status === 'STARTED');
  });
