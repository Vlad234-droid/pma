import { createSelector } from 'reselect';
// @ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType } from '@pma/client/src/config/enum';
import { usersSelector } from './users';
import { Timeline } from '@pma/client/src/config/types';

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

export const userTimelineSelector = (uuid: string) =>
  createSelector(timelineSelector, (timeline) => timeline?.data?.[uuid] || []);

export const userReviewTypesSelector = (uuid: string) =>
  createSelector(
    timelineSelector,
    (timeline) => timeline.data?.[uuid]?.map((item: { code: string }) => item.code) || [],
  );

export const timelinesExistSelector = (colleagueUuid: string) =>
  createSelector(timelineSelector, (timelines) => !!timelines.data?.[colleagueUuid]?.length);

export const timelineStartedSelector = (colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];
    return !data?.some((item) => item.code === Type.START_CYCLE);
  });

export const timelinesMetaSelector = createSelector(timelineSelector, (timeline) => timeline.meta);

export const getTimelineSelector = (colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    // TODO: bugfix. extract to separate function
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];
    const codes = data?.map(({ code }) => code);
    const types = data?.map(({ type }) => type);
    const descriptions = data?.map(({ description }) => description);
    const summaryStatuses = data?.map(({ summaryStatus }) => summaryStatus);
    const startDates = data?.map(({ code, startTime, endTime }) => {
      if (code === 'Q1' || code === 'Q3') return '';
      return `${new Date(code === Type.EYR ? endTime : startTime).toLocaleString('default', {
        month: 'long',
      })} ${new Date(code === Type.EYR ? endTime : startTime).getFullYear()}`;
    });
    return { descriptions, startDates, summaryStatuses, codes, types };
  });

export const getBankTimelineSelector = (colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];

    const hasMYR = data?.some((element) => element.code === 'MYR');
    const quarterDescription = data?.find((element) => element.code === 'Q3')?.description;
    const result = { codes: [], types: [], summaryStatuses: [], descriptions: [], startDates: [], currentStep: 0 };
    let currentStep = 0;
    let step = 0;

    const getDesc = (code, description) => (code !== 'MYR' ? description : `${description} / ${quarterDescription}`);
    const getStartDate = (startTime, endTime, code) =>
      `${new Date(code === Type.EYR ? endTime : startTime).toLocaleString('default', { month: 'short' })} ${new Date(
        code === Type.EYR ? endTime : startTime,
      ).getFullYear()}`;
    const isActive = (status) => status !== 'STARTED' && status !== 'NOT_STARTED';
    const getStep = (step) => (step <= 0 ? 0 : step - 1);

    data?.map(({ code, type, summaryStatus, description, startTime, endTime }) => {
      const { codes, types, summaryStatuses, descriptions, startDates } = result as any;

      if (code !== 'Q3' || !hasMYR) {
        codes.push(code);
        types.push(type);
        summaryStatuses.push(summaryStatus);
        descriptions.push(getDesc(code, description));
        startDates.push(getStartDate(startTime, endTime, code));
        step++;
      }

      if ((code === 'MYR' || code === 'EYR') && isActive(summaryStatus)) {
        currentStep = step;
      }
    });

    return { ...result, currentStep: getStep(currentStep) };
  });

// todo think about remove this selector
export const timelineTypesAvailabilitySelector = (colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];
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

export const isAnniversaryTimelineType = (colleagueUuid: string) =>
  createSelector(timelineTypesAvailabilitySelector(colleagueUuid), (timelineTypes) => {
    return (
      !!timelineTypes[ReviewType.EYR] &&
      !timelineTypes[ReviewType.MYR] &&
      !timelineTypes[ReviewType.OBJECTIVE] &&
      !timelineTypes[ReviewType.QUARTER]
    );
  });

export const getTimelineByCodeSelector = (code: string, colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];
    return data?.find((timeline) => timeline.code === code);
  });

export const getTimelineByReviewTypeSelector = (type: ReviewType, colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];
    return data?.find((timeline) => timeline.reviewType === type);
  });

export const getTimelinesByReviewTypeSelector = (type: ReviewType, colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline[] | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];
    return data?.filter((timeline) => timeline.reviewType === type);
  });

export const getActiveTimelineByReviewTypeSelector = (type: ReviewType, colleagueUuid: string) =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid];
    return data?.find((timeline) => timeline.reviewType === type && timeline.status === 'STARTED');
  });
