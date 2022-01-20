//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { DateTime } from 'luxon';
import { getFullName } from './users';
import { configEntriesSelector } from './config-entries';

export const performanceCycleSelector = (state: RootState) => state.performanceCycle || {};

export const getPerformanceCycleSelector = createSelector(performanceCycleSelector, ({ data }) => {
  return data.map((cycle) => {
    const getFormat = (date) => DateTime.fromISO(date).setLocale('en').toFormat('d LLL yyyy');
    return {
      ...cycle,
      date: `${getFormat(cycle?.startTime)} - ${getFormat(cycle?.endTime)}`,
      createdBy: getFullName(cycle.createdBy),
    };
  });
});

export const getPerformanceCycleMetaSelector = createSelector(performanceCycleSelector, ({ meta }) => meta);

export const getConfigEntriesByPerformanceCycle = (performanceCycleUuid) =>
  createSelector(
    performanceCycleSelector,
    configEntriesSelector,
    ({ data: performanceCycle }, { data: configEntriesData }) => {
      const formDataToFillObj = {};
      const performanceCycleItem = performanceCycle.filter((item) => item.uuid === performanceCycleUuid)?.[0];
      const entryConfigKey = performanceCycleItem?.entryConfigKey;
      const level1EntryConfigKey = `${entryConfigKey?.split('/').slice(0, 1)}/${entryConfigKey
        ?.split('/')
        .slice(1, 2)}/${entryConfigKey?.split('/').slice(-1)}`;
      const level2EntryConfigKey = `${entryConfigKey?.split('/').slice(0, 1)}/${entryConfigKey
        ?.split('/')
        .slice(1, 2)}/${entryConfigKey?.split('/').slice(2, 3)}/${entryConfigKey
        ?.split('/')
        .slice(3, 4)}/${entryConfigKey?.split('/').slice(-1)}`;
      const level3EntryConfigKey = `${entryConfigKey?.split('/').slice(0, 1)}/${entryConfigKey
        ?.split('/')
        .slice(1, 2)}/${entryConfigKey?.split('/').slice(2, 3)}/${entryConfigKey
        ?.split('/')
        .slice(3, 4)}/${entryConfigKey?.split('/').slice(4, 5)}/${entryConfigKey
        ?.split('/')
        .slice(5, 6)}/${entryConfigKey?.split('/').slice(-1)}`;

      const configEntryItem = configEntriesData.filter((item) => item.compositeKey === level1EntryConfigKey)?.[0];

      const level2 = configEntryItem?.children.filter((item) => item.compositeKey === level2EntryConfigKey)?.[0];
      const level3 = level2?.children.filter((item) => item.compositeKey === level3EntryConfigKey)?.[0];
      const level4 = level3?.children.filter((item) => item.compositeKey === entryConfigKey)?.[0];

      formDataToFillObj['name'] = performanceCycleItem?.name;
      formDataToFillObj['level1'] = configEntryItem?.name;
      formDataToFillObj['level2'] = level2?.name;
      formDataToFillObj['level3'] = level3?.name;
      formDataToFillObj['entryConfigKey'] = level4?.name;
      return { formDataToFillObj, configEntryItem, performanceCycleItem };
    },
  );

export const getTimelinePointsByPerformanceCycleUuidSelector = (performanceCycleUuid) =>
  createSelector(performanceCycleSelector, ({ data }) => {
    // @ts-ignore
    const performanceCycleItem = data.filter((item) => item.uuid === performanceCycleUuid)?.[0];
    // @ts-ignore
    return performanceCycleItem?.metadata?.cycle?.timelinePoints;
  });

export const getFormsByPerformanceCycleUuidSelector = (performanceCycleUuid) =>
  // @ts-ignore
  createSelector(performanceCycleSelector, ({ data }) => {
    // @ts-ignore
    const performanceCycleItem = data.filter((item) => item.uuid === performanceCycleUuid)?.[0] || {};
    // @ts-ignore
    return performanceCycleItem?.metadata?.cycle?.timelinePoints
      ?.filter((point) => point.type === 'REVIEW')
      .map((point) => {
        const { json, code: displayName } = point?.form || {};
        if (json) return { ...JSON.parse(json), displayName };
      });
  });
