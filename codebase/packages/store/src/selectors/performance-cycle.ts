//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { DateTime } from 'luxon';
import { getFullName } from './users';

//TODO: when we integrated openapi this @ts-ignore is disappear

export const performanceCycleSelector = (state: RootState) => state.performanceCycle.data || [];
export const performanceCycleFormsSelector = (state: RootState) => state.performanceCycle.forms || {};
export const performanceCycleMetaSelector = (state: RootState) => state.performanceCycle.meta;
export const performanceCycleMappingKeys = (state: RootState) => state.performanceCycle.mappingKeys || [];

export const getPerformanceCycleSelector = createSelector(performanceCycleSelector, (performanceCycles) => {
  return performanceCycles.map((cycle) => {
    const getFormat = (date) => DateTime.fromISO(date).setLocale('en').toFormat('d LLL yyyy');
    return {
      // @ts-ignore
      ...cycle,
      // @ts-ignore
      date: `${getFormat(cycle?.startTime)} - ${getFormat(cycle?.endTime)}`,
      // @ts-ignore
      createdBy: getFullName(cycle.createdBy),
    };
  });
});

export const performanceCycleByUuidSelector = (performanceCycleUuid: string) =>
  createSelector(performanceCycleSelector, (performanceCycles) => {
    return performanceCycles.find((cycle) => {
      //@ts-ignore
      return cycle.uuid === performanceCycleUuid;
    });
  });

export const performanceCycleFormsByUuidSelector = (performanceCycleUuid: string) =>
  createSelector(performanceCycleFormsSelector, (forms) => {
    return forms[performanceCycleUuid];
  });

export const getTimelinePointsByPerformanceCycleUuidSelector = (performanceCycleUuid) =>
  createSelector(performanceCycleSelector, (performanceCycleList) => {
    // @ts-ignore
    const performanceCycleItem = performanceCycleList.find((item) => item.uuid === performanceCycleUuid) || {};
    // @ts-ignore
    return performanceCycleItem?.metadata?.cycle?.timelinePoints;
  });

export const getFormsByPerformanceCycleUuidSelector = (performanceCycleUuid) =>
  // @ts-ignore
  createSelector(performanceCycleSelector, (performanceCycleList) => {
    // @ts-ignore
    const performanceCycleItem = performanceCycleList.find((item) => item.uuid === performanceCycleUuid) || {};
    // @ts-ignore
    return performanceCycleItem?.metadata?.cycle?.timelinePoints
      ?.filter((point) => point.type === 'REVIEW')
      .map((point) => {
        const { json, code: displayName } = point?.form || {};
        if (json) return { ...JSON.parse(json), displayName };
      });
  });
