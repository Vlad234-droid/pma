import { TFunction } from 'components/Translation';
import { Rating, ReportPage, StatisticsTitlesReportKeys, TitlesReport } from 'config/enum';

export enum View {
  CHART = 'chart',
  QUANTITY = 'quantity',
}

export type Data = {
  percentage: string;
  count?: string;
  title?: string;
};

export enum IsReportTiles {
  OBJECTIVES_SUBMITTED = 'Objectives submitted',
  OBJECTIVES_APPROVED = 'Objectives approved',
  MID_YEAR_FORMS = 'Mid-year forms',
  BREAKDOWN_MID_YEAR_REVIEW = 'Breakdown of mid-year review',
  YEAR_END_FORMS = 'Year-end forms',
  BREAKDOWN_YEAR_END_REVIEW = 'Breakdown of year-end review',
  MOMENT_FEEDBACK = 'Everyday Feedback',
  NEW_TO_BUSINESS = 'New to business',
  ANNIVERSARY_REVIEWS = 'Anniversary Reviews',
  WL4AND5 = 'WL4 & 5 Objectives approved',
}

export const convertToLink = (str) => str.split('_').slice(1).join('-').toLowerCase();

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
  { id: ReportPage.REPORT_WORK_LEVEL, label: t(StatisticsTitlesReportKeys.WL4And5), isChecked: false },
  { id: '11', label: t('select_all', 'Select All'), isChecked: false },
];

export const getSelectAllField = (t) => ({ id: '11', label: t('select_all', 'Select All'), isChecked: false });

export const prepareData = (selectedCheckboxes, isCheckAll, t) => {
  return [
    ...selectedCheckboxes.filter((item) => item.isChecked),
    {
      ...(isCheckAll &&
        !selectedCheckboxes[selectedCheckboxes.length - 1].isChecked && {
          ...getSelectAllField(t),
          isChecked: true,
        }),
    },
  ].filter((item) => Object.keys(item).length);
};

export const getDefaultData = (type, t) => {
  const report = {
    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: [{ percentage: 0 }],
    [ReportPage.REPORT_APPROVED_OBJECTIVES]: [{ percentage: 0 }],

    [ReportPage.REPORT_MID_YEAR_REVIEW]: [
      { percentage: 0, title: t(TitlesReport.SUBMITTED, 'Submitted') },
      { percentage: 0, title: t(TitlesReport.APPROVED, 'Approved') },
    ],
    [ReportPage.REPORT_END_YEAR_REVIEW]: [
      { percentage: 0, title: t(TitlesReport.SUBMITTED, 'Submitted') },
      { percentage: 0, title: t(TitlesReport.APPROVED, 'Approved') },
    ],
    [ReportPage.REPORT_FEEDBACK]: [
      { percentage: 0, title: t(TitlesReport.REQUESTED, 'Requested') },
      { percentage: 0, title: t(TitlesReport.GIVEN, 'Given') },
    ],

    [ReportPage.REPORT_WORK_LEVEL]: [{ percentage: 0, title: 'Approved' }],

    [ReportPage.REPORT_NEW_TO_BUSINESS]: [{ percentage: 0, title: t(Rating.COLLEAGUES, 'Colleagues') }],

    [ReportPage.REPORT_MYR_BREAKDOWN]: [
      {
        percentage: 0,
        count: 0,
        title: t(Rating.BELOW_EXPECTED, 'Below expected'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.SATISFACTORY, 'Satisfactory'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.GREAT, 'Great'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.OUTSTANDING, 'Outstanding'),
      },
    ],
    [ReportPage.REPORT_EYR_BREAKDOWN]: [
      {
        percentage: 0,
        count: 0,
        title: t(Rating.BELOW_EXPECTED, 'Below expected'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.SATISFACTORY, 'Satisfactory'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.GREAT, 'Great'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.OUTSTANDING, 'Outstanding'),
      },
    ],

    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: [
      {
        percentage: 0,
        count: 0,
        title: t(Rating.QUARTER_1, 'Quarter 1'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.QUARTER_2, 'Quarter 2'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.QUARTER_3, 'Quarter 3'),
      },
      {
        percentage: 0,
        count: 0,
        title: t(Rating.QUARTER_4, 'Quarter 4'),
      },
    ],
  };
  return report[type];
};
