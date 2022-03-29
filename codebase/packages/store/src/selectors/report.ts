import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { Status } from '../../../client/src/config/enum';

export const reportSelector = (state: RootState) => state.report;
const statusIndex = 8;

export const approvedObjectivesSelector = createSelector(reportSelector, (report: any) => {
  const { objectiveReports } = report;
  const approvedCount = objectiveReports.filter((item) => item[statusIndex] === Status.APPROVED).length;
  const approvedPercent = Math.floor((100 * approvedCount) / objectiveReports.length) || 0;
  return [approvedPercent, 'Approved'];
});

export const notApprovedObjectivesSelector = createSelector(reportSelector, (report: any) => {
  const { objectiveReports } = report;
  const notApprovedCount = objectiveReports.filter((item) => item[statusIndex] !== Status.APPROVED).length;
  const notApprovedPercent = Math.floor((100 * notApprovedCount) / objectiveReports.length) || 0;
  return [notApprovedPercent, 'Not approved'];
});

export const objectiveStatisticSelector = createSelector(reportSelector, (report: any) => {
  const { objectiveStatistics } = report;
  return objectiveStatistics;
});

export const getStatisticReportSelector = createSelector(reportSelector, (report: any) => {
  if (Object.keys(report?.objectiveStatistics).length) {
    const {
      //@ts-ignore
      objectiveStatistics: { data, metadata },
    } = report;
    const { columnMetadata } = metadata ?? [];
    return [data, columnMetadata];
  }
  return [[], []];
});

export const getPendingObjectivesSelector = (type: string) =>
  createSelector(reportSelector, (report: any) => {
    const { colleagues } = report;
    return colleagues?.filter((colleague) => !Number(colleague.tags[type]));
  });

export const getDoneObjectivesSelector = (type: string) =>
  createSelector(reportSelector, (report: any) => {
    const { colleagues } = report;

    return colleagues?.filter((colleague) => Number(colleague.tags[type]));
  });
