import { TitlesReport, ReportPage } from 'config/enum';
import { Page } from 'pages';

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
      chart: t(TitlesReport.MOMENT_FEEDBACK, 'Everyday Feedback'),
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

export const checkExceptionType = (type) =>
  !!type && type !== ReportPage.REPORT_NEW_TO_BUSINESS && type !== ReportPage.REPORT_APPROVED_OBJECTIVES;
export const checkBusinessType = (type) => !!type && type === ReportPage.REPORT_NEW_TO_BUSINESS;

export const checkColleaguesCount = (type) =>
  (!!type && type === ReportPage.REPORT_APPROVED_OBJECTIVES) ||
  type === ReportPage.REPORT_SUBMITTED_OBJECTIVES ||
  type === ReportPage.REPORT_MID_YEAR_REVIEW ||
  type === ReportPage.REPORT_END_YEAR_REVIEW;

export const checkWorkLevel = (type) => !!type && type === ReportPage.REPORT_WORK_LEVEL;

export const defineHeaderTitle = (type, t) => {
  const tilePage = Page.TILE_REPORT_STATISTICS;
  const titles = {
    [ReportPage.REPORT_APPROVED_OBJECTIVES]: {
      [tilePage]: t('objectives_approved', 'Objectives approved'),
    },
    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: {
      [tilePage]: t('objectives_submitted', 'Objectives submitted'),
    },
    [ReportPage.REPORT_MID_YEAR_REVIEW]: {
      [tilePage]: t('mid_year_review', 'Mid-year review'),
    },
    [ReportPage.REPORT_END_YEAR_REVIEW]: {
      [tilePage]: t('end_year_review', 'End year review'),
    },
    [ReportPage.REPORT_WORK_LEVEL]: {
      [tilePage]: t('WL4_and_5', 'WL4 & 5 Objectives submitted'),
    },
    [ReportPage.REPORT_NEW_TO_BUSINESS]: {
      [tilePage]: t('new_to_business', 'New to business'),
    },
    [ReportPage.REPORT_FEEDBACK]: {
      [tilePage]: t('everyday_feedback', 'Everyday Feedback'),
    },
    [ReportPage.REPORT_EYR_BREAKDOWN]: {
      [tilePage]: t('eyr_breakdown', 'Breakdown of Year-end review'),
    },
    [ReportPage.REPORT_MYR_BREAKDOWN]: {
      [tilePage]: t('myr_breakdown', 'Breakdown of Mid-year review'),
    },
    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: {
      [tilePage]: t('anniversary_reviews', 'Anniversary Reviews completed per quarterTileRport'),
    },
  };
  return titles[type];
};

export const getTableTitles = (t) => [
  t('employee_no'),
  t('employee_uuid'),
  t('first_name'),
  t('surname'),
  t('working_level'),
  t('job_title'),
  t('line_manager'),

  t('objective_number_count'),

  t('link_to_strategic_priorities'),
  t('objective'),
  t('achieved_objective'),
  t('over_achieved_objective'),
];
