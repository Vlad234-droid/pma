import { TitlesReport } from 'config/enum';
import { ReportPage } from '../config';

export const convertToReportEnum = (pathname) => {
  return pathname.split('/').slice(1).join('_').split('-').join('_').toUpperCase();
};

export const getReportTitles = (t, type) => {
  const report = {
    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: {
      pending: t('not_submitted', 'Not submitted'),
      done: t('submitted', 'Submitted'),
      chart: t(TitlesReport.OBJECTIVES_SUBMITTED, 'Objectives submitted'),
    },
    [ReportPage.REPORT_APPROVED_OBJECTIVES]: {
      pending: t('not_approved', 'Not approved'),
      done: t('approved', 'Approved'),
      chart: t(TitlesReport.OBJECTIVES_APPROVED, 'Objectives approved'),
    },
    [ReportPage.REPORT_MID_YEAR_REVIEW]: {
      pending: t('submitted', 'Submitted'),
      done: t('Approved', 'Approved'),
      chart: t(TitlesReport.MYR, 'Mid-year review'),
    },
    [ReportPage.REPORT_END_YEAR_REVIEW]: {
      pending: t('submitted', 'Submitted'),
      done: t('Approved', 'Approved'),
      chart: t(TitlesReport.EYR, 'End-year review'),
    },
    [ReportPage.REPORT_FEEDBACK]: {
      pending: t('requested', 'Requested'),
      done: t('given', 'Given'),
      chart: t(TitlesReport.MOMENT_FEEDBACK, 'In the moment feedback'),
    },
    [ReportPage.REPORT_WORK_LEVEL]: {
      pending: t('approved', 'Approved'),
      done: t('not_approved', 'Not Approved'),
      chart: t(TitlesReport.WL4And5, 'WL4 & 5 Objectives submitted'),
    },
  };

  return report[type];
};

export const checkForPendingChartView = (type) => {
  if (!type) return;
  if (type.split(' ').length >= 2) return type.split(' ')[0];
  return type;
};
export const checkForDoneChartView = (type) => {
  if (!type) return;
  if (type.split(' ').length >= 2) return type.split(' ')[1];
  return type;
};
