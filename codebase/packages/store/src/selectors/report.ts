import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { Status, ReportPage } from '../../../client/src/config/enum';

export const reportSelector = (state: RootState) => state.report;
const statusIndex = 8;

export const getReportMetaSelector = createSelector(reportSelector, (report) => report.meta);

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

export const getPendingReportSelector = (type: string, reportType: string) =>
  createSelector(reportSelector, (report: any) => {
    if (!reportType) return;
    const { colleagues, objectiveReports } = report;
    if (reportType !== ReportPage.REPORT_WORK_LEVEL) {
      return colleagues?.filter((colleague) =>
        reportType.split(' ').length >= 2 ? Number(colleague.tags[type]) : !Number(colleague.tags[type]),
      );
    }
    return objectiveReports.reduce((acc, item) => {
      if (item[8] === Status.APPROVED) return acc;
      const colleagues = {
        uuid: item[1],
        firstName: item[2],
        lastName: item[3],
        jobName: item[5],
      };
      acc.push(colleagues);
      return acc;
    }, []);
  });

export const getDoneReportSelector = (type: string, reportType: string) =>
  createSelector(reportSelector, (report: any) => {
    if (!reportType) return;
    const { colleagues, objectiveReports } = report;

    if (reportType !== ReportPage.REPORT_WORK_LEVEL) {
      return colleagues?.filter((colleague) => Number(colleague.tags[type]));
    }
    return objectiveReports.reduce((acc, item) => {
      if (item[8] !== Status.APPROVED) return acc;

      const colleagues = {
        uuid: item[1],
        firstName: item[2],
        lastName: item[3],
        jobName: item[5],
      };
      acc.push(colleagues);
      return acc;
    }, []);
  });
