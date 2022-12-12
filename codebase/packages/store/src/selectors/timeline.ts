import { createSelector } from 'reselect';
// @ts-ignore
import { RootState } from 'typesafe-actions';
//TODO: should move to store or separate package @pma/types
import { ReviewType, TimelineStatus } from '@pma/client/src/config/enum';
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

export const userTimelineSelector = (uuid: string, cycle = 'CURRENT') =>
  createSelector(timelineSelector, (timeline) => timeline?.data?.[uuid]?.[cycle] || []);

export const userReviewTypesSelector = (uuid: string, cycle = 'CURRENT') =>
  createSelector(
    timelineSelector,
    (timeline) => timeline.data?.[uuid]?.[cycle]?.map((item: { code: string }) => item.code) || [],
  );

export const timelinesExistSelector = (colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(timelineSelector, (timelines) => !!timelines.data?.[colleagueUuid]?.[cycle]?.length);

export const timelineStartedSelector = (colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
    return !data?.some((item) => item.code === Type.START_CYCLE);
  });

export const timelinesMetaSelector = createSelector(timelineSelector, (timeline) => timeline.meta);

export const getTimelineSelector = (colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    // TODO: bugfix. extract to separate function
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
    const filteredData =
      data?.filter(({ properties }) => {
        return properties?.TIMELINE_POINT_HIDDEN !== 'true';
      }) || [];
    const codes = filteredData?.map(({ code }) => code);
    const types = filteredData?.map(({ type }) => type);
    const descriptions = filteredData?.map(({ description }) => description);
    const summaryStatuses = filteredData?.map(({ summaryStatus }) => summaryStatus);
    const startDates = filteredData?.map(({ code, startTime, endTime }) => {
      if (code === 'Q1' || code === 'Q3') return '';
      return `${new Date(code === Type.EYR ? endTime : startTime).toLocaleString('default', {
        month: 'long',
      })} ${new Date(code === Type.EYR ? endTime : startTime).getFullYear()}`;
    });
    return { descriptions, startDates, summaryStatuses, codes, types };
  });

export const getCalibrationPointSelector = (colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
    return (
      data?.find(({ code }) => {
        return code === 'CALIBRATION';
      }) || {}
    );
  });

export const getBankTimelineSelector = (colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];

    const result = { codes: [], types: [], summaryStatuses: [], descriptions: [], startDates: [], currentStep: 0 };
    let currentStep = 0;
    let step = 0;

    const getStartDate = (startTime, endTime, code) => getDateString(code === Type.EYR ? endTime : startTime);
    const getDateString = (time) =>
      `${new Date(time).toLocaleString('default', { month: 'short' })} ${new Date(time).getFullYear()}`;
    const isActive = (status) => status !== TimelineStatus.STARTED && status !== TimelineStatus.NOT_STARTED;
    const getStep = (step) => (step <= 0 ? 0 : step - 1);
    const getDesc = (description) => description.replace(/(review)/g, '');

    data?.map(({ code, type, summaryStatus, description, startTime, endTime }) => {
      const { codes, types, summaryStatuses, descriptions, startDates } = result as any;

      codes.push(code);
      types.push(type);
      summaryStatuses.push(summaryStatus);
      descriptions.push(getDesc(description));
      startDates.push(getStartDate(startTime, endTime, code));
      step++;

      if (isActive(summaryStatus)) {
        currentStep = step;
      }
    });

    return { ...result, currentStep: getStep(currentStep) };
  });

// todo think about remove this selector
export const timelineTypesAvailabilitySelector = (colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline) => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
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

export const isAnniversaryTimelineType = (colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(timelineTypesAvailabilitySelector(colleagueUuid, cycle), (timelineTypes) => {
    return (
      !!timelineTypes[ReviewType.EYR] &&
      !timelineTypes[ReviewType.MYR] &&
      !timelineTypes[ReviewType.OBJECTIVE] &&
      !timelineTypes[ReviewType.QUARTER]
    );
  });

export const getTimelineByCodeSelector = (code: string, colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
    return data?.find((timeline) => timeline.code === code);
  });

export const getTimelineByReviewTypeSelector = (type: ReviewType, colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
    return data?.find((timeline) => timeline.reviewType === type);
  });

export const getTimelinesByReviewTypeSelector = (type: ReviewType, colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline[] | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
    return data?.filter((timeline) => timeline.reviewType === type);
  });

export const getActiveTimelineByReviewTypeSelector = (type: ReviewType, colleagueUuid: string, cycle = 'CURRENT') =>
  createSelector(usersSelector, timelineSelector, (user, timeline): Timeline | undefined => {
    const uuid = colleagueUuid === USER.current ? user?.current.info.colleague.colleagueUUID : colleagueUuid;
    const data = timeline.data?.[uuid]?.[cycle];
    return data?.find((timeline) => timeline.reviewType === type && timeline.status === 'STARTED');
  });
