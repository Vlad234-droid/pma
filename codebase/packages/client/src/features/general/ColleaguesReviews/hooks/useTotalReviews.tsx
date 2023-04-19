import { getReportByType } from '@pma/store';
import { useSelector } from 'react-redux';

import { ReportTypeExtension, ReportPage, ReportType } from 'config/enum';

const report = {
  [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: {
    type: ReportType.OBJECTIVE,
    selectorType: 'review',
  },
  [ReportPage.REPORT_APPROVED_OBJECTIVES]: {
    type: ReportType.OBJECTIVE,
    selectorType: 'review',
  },
  [ReportPage.REPORT_MID_YEAR_REVIEW]: {
    type: ReportType.MYR,
    selectorType: 'review',
  },
  [ReportPage.REPORT_END_YEAR_REVIEW]: {
    type: ReportType.EYR,
    selectorType: 'review',
  },
  [ReportPage.REPORT_EYR_BREAKDOWN]: {
    type: ReportType.EYR,
    selectorType: 'overallRatings',
  },
  [ReportPage.REPORT_MYR_BREAKDOWN]: {
    type: ReportType.MYR,
    selectorType: 'overallRatings',
  },
  [ReportPage.REPORT_NEW_TO_BUSINESS]: {
    type: ReportType.NTB,
    selectorType: 'newToBusiness',
  },
  [ReportPage.REPORT_FEEDBACK]: {
    type: ReportType.FEEDBACK,
    selectorType: 'feedbacks',
  },
  [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: {
    type: ReportType.EYR,
    selectorType: 'anniversaryReviews',
  },
  [ReportPage.REPORT_WORK_LEVEL]: {
    type: ReportType.OBJECTIVE,
    selectorType: 'leadershipReviews',
  },
};

export const useTotalReviews = (configKey: ReportPage, extensionKey?: ReportTypeExtension) => {
  const reportData = report[configKey];

  const chartData = useSelector(getReportByType(reportData?.selectorType)) ?? [];

  const filterTypeKey = extensionKey ? reportData.type + extensionKey : reportData.type;

  return chartData.find((item) => item.type === filterTypeKey);
};
