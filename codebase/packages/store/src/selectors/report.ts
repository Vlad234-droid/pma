import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { Status, ReportPage } from '@pma/client/src/config/enum';
import { ReportTags } from '@pma/client/src/features/general/TileReport/config';
import { WorkLevel } from '../config/types';

export const reportSelector = (state: RootState) => state.report;
const statusIndex = 9;

export const getReportMetaSelector = createSelector(reportSelector, (report) => report.meta);

export const approvedObjectivesSelector = createSelector(reportSelector, (report: any) => {
  const { objectiveReports } = report;
  const approvedCount = objectiveReports.filter((item) => item[statusIndex] === Status.APPROVED).length;
  const approvedPercent = Math.round((100 * approvedCount) / objectiveReports.length) || 0;
  return [approvedPercent, 'Approved'];
});

export const notApprovedObjectivesSelector = createSelector(reportSelector, (report: any) => {
  const { objectiveReports } = report;
  const notApprovedCount = objectiveReports.filter((item) => item[statusIndex] !== Status.APPROVED).length;
  const notApprovedPercent = Math.round((100 * notApprovedCount) / objectiveReports.length) || 0;
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
export const getTableChartData = (type: string) =>
  createSelector(reportSelector, (report: any) => {
    const { colleagues } = report;

    if (type !== ReportTags.REPORT_MYR_BREAKDOWN && type !== ReportTags.REPORT_EYR_BREAKDOWN) return {};

    return colleagues.reduce(
      (acc, colleague) => {
        if (colleague.tags[type] !== '') acc[colleague.tags[type]].push(colleague);
        return acc;
      },
      {
        'Below expected': [],
        Satisfactory: [],
        Great: [],
        Outstanding: [],
      },
    );
  });
export const getAnniversaryData = createSelector(reportSelector, (report: any) => {
  const { colleagues } = report;

  return colleagues.reduce(
    (acc, colleague) => {
      Object.keys(acc).forEach((type) => {
        if (Number(colleague.tags[type])) acc[type].push(colleague);
        return acc;
      });

      return acc;
    },
    {
      has_eyr_approved_1_quarter: [],
      has_eyr_approved_2_quarter: [],
      has_eyr_approved_3_quarter: [],
      has_eyr_approved_4_quarter: [],
    },
  );
});

export const getLimitedWLProfilesSelector = createSelector(reportSelector, (report: any) => {
  const { limitedObjectiveReports } = report;

  return limitedObjectiveReports?.reduce((acc, item) => {
    if (item.includes(WorkLevel.WL4) || item.includes(WorkLevel.WL5)) {
      const [
        _,
        employeeNo,
        colleagueUuid,
        firstName,
        lastName,
        workingLevel,
        jobTitle,
        lineManager,
        objectiveNumber,
        __,
        strategicDriver,
        title,
        howAchieved,
        howOverAchieved,
      ] = item;

      acc.push({
        employeeNo,
        colleagueUuid,
        firstName,
        lastName,
        workingLevel,
        jobTitle,
        lineManager,
        objectiveNumber,
        strategicDriver,
        title,
        howAchieved,
        howOverAchieved,
      });
      return acc;
    }
    return acc;
  }, []);
});

export const getTotalWlSelector = createSelector(reportSelector, (report: any) => {
  const { limitedObjectiveReports } = report;

  return limitedObjectiveReports?.[0]?.[0];
});
