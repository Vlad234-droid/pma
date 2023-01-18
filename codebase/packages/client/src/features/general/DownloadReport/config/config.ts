import { MetaDataReport, ReportPage, StatisticsTitlesReport, StatisticsTitlesReportKeys } from 'config/enum';
import { TFunction } from 'components/Translation';

const statisticsReport = {
  [StatisticsTitlesReport.COLLEAGUES_COUNT]: [MetaDataReport.COLLEAGUES_COUNT],
  [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: [MetaDataReport.OBJECTIVES_SUBMITTED_PERCENTAGE],
  [ReportPage.REPORT_APPROVED_OBJECTIVES]: [MetaDataReport.OBJECTIVES_APPROVED_PERCENTAGE],
  [ReportPage.REPORT_MID_YEAR_REVIEW]: [
    MetaDataReport.MYR_SUBMITTED_PERCENTAGE,
    MetaDataReport.MYR_APPROVED_PERCENTAGE,
  ],
  [ReportPage.REPORT_MYR_BREAKDOWN]: [
    MetaDataReport.MYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT,
    MetaDataReport.MYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_SATISFACTORY_COUNT,
    MetaDataReport.MYR_RATING_BREAKDOWN_GREAT_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_GREAT_COUNT,
    MetaDataReport.MYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_OUTSTANDING_COUNT,
  ],
  [ReportPage.REPORT_END_YEAR_REVIEW]: [
    MetaDataReport.EYR_SUBMITTED_PERCENTAGE,
    MetaDataReport.EYR_APPROVED_PERCENTAGE,
  ],
  [ReportPage.REPORT_EYR_BREAKDOWN]: [
    MetaDataReport.EYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT,
    MetaDataReport.EYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_SATISFACTORY_COUNT,
    MetaDataReport.EYR_RATING_BREAKDOWN_GREAT_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_GREAT_COUNT,
    MetaDataReport.EYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_OUTSTANDING_COUNT,
  ],
  [ReportPage.REPORT_FEEDBACK]: [
    MetaDataReport.FEEDBACK_REQUESTED_PERCENTAGE,
    MetaDataReport.FEEDBACK_GIVEN_PERCENTAGE,
  ],
  [ReportPage.REPORT_NEW_TO_BUSINESS]: [MetaDataReport.NEW_TO_BUSINESS_COUNT],
  [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: [
    MetaDataReport.TOTAL_UNIQUE_NUMBER_OF_COLLEAGUE_WITH_ANNIVERSARY_CYCLE,
    MetaDataReport.NUMBER_OF_ANNIVERSARY_REVIEWS_COMPLETED,
  ],
};

export const checkboxes = (t: TFunction) => [
  {
    id: ReportPage.REPORT_SUBMITTED_OBJECTIVES,
    label: t(StatisticsTitlesReportKeys.OBJECTIVES_SUBMITTED),
    isChecked: false,
  },
  {
    id: ReportPage.REPORT_APPROVED_OBJECTIVES,
    label: t(StatisticsTitlesReportKeys.OBJECTIVES_APPROVED),
    isChecked: false,
  },
  {
    id: ReportPage.REPORT_MID_YEAR_REVIEW,
    label: t(StatisticsTitlesReportKeys.MID_YEAR_FORMS),
    isChecked: false,
  },
  {
    id: ReportPage.REPORT_MYR_BREAKDOWN,
    label: t(StatisticsTitlesReportKeys.BREAKDOWN_OF_MID_YEAR_RATINGS),
    isChecked: false,
  },
  {
    id: ReportPage.REPORT_END_YEAR_REVIEW,
    label: t(StatisticsTitlesReportKeys.YEAR_END_FORMS),
    isChecked: false,
  },
  {
    id: ReportPage.REPORT_EYR_BREAKDOWN,
    label: t(StatisticsTitlesReportKeys.BREAKDOWN_OF_YEAR_END_RATINGS),
    isChecked: false,
  },
  {
    id: ReportPage.REPORT_FEEDBACK,
    label: t(StatisticsTitlesReportKeys.IN_THE_MOMENT_FEEDBACK),
    isChecked: false,
  },

  {
    id: ReportPage.REPORT_NEW_TO_BUSINESS,
    label: t(StatisticsTitlesReportKeys.BUSINESS),
    isChecked: false,
  },

  {
    id: ReportPage.REPORT_ANNIVERSARY_REVIEWS,
    label: t(StatisticsTitlesReportKeys.ANNIVERSARY_REVIEWS),
    isChecked: false,
  },
];

export const getTopics = (selectedCheckboxes) =>
  selectedCheckboxes.reduce((acc, item) => {
    acc.push(...statisticsReport[item]);
    return acc;
  }, []);
