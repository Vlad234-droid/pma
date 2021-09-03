import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const requestByReportingForSubsidiarySelector = (state: RootState) => state.requests.data;

export const requestByReportingUuidAndSubsidiaryUuidSelector = (reportingPeriodUuid: string, subsidiaryUuid: string) =>
  createSelector(requestByReportingForSubsidiarySelector, (data) =>
    data && data[reportingPeriodUuid] ? data[reportingPeriodUuid][subsidiaryUuid] : null,
  );

export const requestByUuidSelector = (reportingPeriodUuid: string, subsidiaryUuid: string, requestUuid: string) =>
  createSelector(requestByReportingUuidAndSubsidiaryUuidSelector(reportingPeriodUuid, subsidiaryUuid), (items) => {
    return items ? items.find(({ uuid }) => uuid === requestUuid) : null;
  });
