//@ts-ignore
import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { sortByDate } from '../utils/date';

type Option = {
  label: string;
  value: string;
};

export const reportingPeriodsSelector = (state: RootState) => state.reportingPeriods.data || [];

export const sortedByDateReportingPeriodsSelector = createSelector(reportingPeriodsSelector, (data = []) =>
  data.sort(({ startDate: fStartDate }, { startDate: eStartDate }) => sortByDate(fStartDate, eStartDate)),
);

export const reportingPeriodsOptionsSelector = createSelector(
  reportingPeriodsSelector,
  (data = []): Array<Option> => data.map(({ uuid, name }) => ({ label: name, value: uuid })),
);

export const reportingPeriodsLoadingSelector = (state: RootState) => state.reportingPeriods.meta.loading;

export const subsidiariesForReportingPeriodSelector = (state: RootState) => state.reportingPeriods.subsidiaries;

export const reportingPeriodByUuidSelector = (reportingUuid: string) =>
  createSelector(reportingPeriodsSelector, (data) => (data ? data.find(({ uuid }) => uuid === reportingUuid) : null));

export const subsidiariesByReportingUuidSelector = (uuid) =>
  createSelector(subsidiariesForReportingPeriodSelector, (data) => (data ? data[uuid] : null));

export const subsidiariesOptionsByReportingUuidSelector = (uuid) =>
  createSelector(subsidiariesForReportingPeriodSelector, (data) =>
    data
      ? data[uuid]?.map(({ uuid: value, name }) => ({
          label: name,
          value,
        }))
      : [],
  );

export const subsidiaryUuidsForReportingPeriodByReportingUuidSelector = (value) => {
  return createSelector(subsidiariesForReportingPeriodSelector, (data) => {
    if (!data || !data[value]) return null;
    return data[value].map(({ uuid }) => uuid);
  });
};

export const reportingPeriodsColleaguesSelector = (state: RootState) => state.reportingPeriods.colleagues;

export const reportingPeriodsSourcesSelector = (state: RootState) => state.reportingPeriods.sources;

export const subsidiariesForReportingPeriodSelectorByReportingUuid = (uuid) =>
  createSelector(subsidiariesForReportingPeriodSelector, (data) => (data ? data[uuid] : null));
