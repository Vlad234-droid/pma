import { TitlesReport, ReportPage } from 'config/enum';

export const convertToReportEnum = (pathname) =>
  pathname
    .split('/')
    .filter((item) => item)
    .join('_')
    .split('-')
    .join('_')
    .toUpperCase();

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
      pending: t('not_approved', 'Not Approved'),
      done: t('approved', 'Approved'),
      chart: t(TitlesReport.WL4And5, 'WL4 & 5 Objectives submitted'),
    },
    [ReportPage.REPORT_NEW_TO_BUSINESS]: {
      done: t('TitlesReport.BUSINESS', 'New to business'),
      chart: t('TitlesReport.BUSINESS', 'New to business'),
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

export const checkTableChart = (type) =>
  type === ReportPage.REPORT_EYR_BREAKDOWN ||
  type === ReportPage.REPORT_MYR_BREAKDOWN ||
  type === ReportPage.REPORT_ANNIVERSARY_REVIEWS;

export const getTableChartTitle = (t, type) => {
  const titles = {
    [ReportPage.REPORT_MYR_BREAKDOWN]: t(TitlesReport.MYR_BREAKDOWN, 'Breakdown of Mid-year review'),
    [ReportPage.REPORT_EYR_BREAKDOWN]: t(TitlesReport.EYR_BREAKDOWN, 'Breakdown of End-year review'),
    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: t(
      TitlesReport.ANNIVERSARY_REVIEWS,
      'Anniversary Reviews completed per quarter',
    ),
  };
  return titles[type];
};

export const checkBusinessType = (type) =>
  !!type && type !== ReportPage.REPORT_NEW_TO_BUSINESS && type !== ReportPage.REPORT_APPROVED_OBJECTIVES;
