import { getCurrentYear, getLocalNow, getPrevYear } from 'utils';
import { ReportPage, TitlesReport } from 'config/enum';

const startMonth = 3;
export const isStartPeriod = () => getLocalNow().month >= startMonth;
export const getCurrentYearWithStartDate = () => (isStartPeriod() ? getCurrentYear() : getPrevYear(1));

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
      chart: t(TitlesReport.WL4AND5, 'WL4 & 5 Objectives submitted'),
    },
    [ReportPage.REPORT_NEW_TO_BUSINESS]: {
      done: t('TitlesReport.BUSINESS', 'New to business'),
      chart: t('TitlesReport.BUSINESS', 'New to business'),
    },
  };

  return report[type];
};

export const getTitle = (t, type) => {
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

export const checkTableChart = (type) =>
  type === ReportPage.REPORT_EYR_BREAKDOWN ||
  type === ReportPage.REPORT_MYR_BREAKDOWN ||
  type === ReportPage.REPORT_ANNIVERSARY_REVIEWS;

export const checkBusinessType = (type) => !!type && type === ReportPage.REPORT_NEW_TO_BUSINESS;
