import { MetaDataReport, StatisticsTitlesReport, StatisticsTitlesReportKeys, Status } from 'config/enum';
import { getCurrentYear } from 'utils/date';

export enum IsReportTiles {
  OBJECTIVES_SUBMITTED = 'Objectives submitted',
  OBJECTIVES_APPROVED = 'Objectives approved',
  MID_YEAR_FORMS = 'Mid-year forms',
  BREAKDOWN_MID_YEAR_REVIEW = 'Breakdown of mid-year review',
  YEAR_END_FORMS = 'Year-end forms',
  BREAKDOWN_YEAR_END_REVIEW = 'Breakdown of year-end review',
  MOMENT_FEEDBACK = 'In the moment feedback',
  NEW_TO_BUSINESS = 'New to business',
  ANNIVERSARY_REVIEWS = 'Anniversary Reviews completed per quarter',
  WL4And5 = 'WL4 & 5 Objectives submitted',
}
export const getFieldOptions = (currentYear) => {
  return [
    { value: (currentYear - 1).toString(), label: (currentYear - 1).toString() },
    { value: (currentYear - 2).toString(), label: (currentYear - 2).toString() },
    { value: (currentYear - 3).toString(), label: (currentYear - 3).toString() },
  ];
};

export const getYearsFromCurrentYear = (currentYear) => {
  return [
    { value: currentYear.toString(), label: currentYear.toString() },
    { value: (currentYear - 1).toString(), label: (currentYear - 1).toString() },
    { value: (currentYear - 2).toString(), label: (currentYear - 2).toString() },
  ];
};

export const getRequestParams = (selectedCheckboxes) =>
  selectedCheckboxes.reduce((acc, item) => {
    if (item.isChecked) {
      acc.push(...statisticsReport[item.label]);
    }
    return acc;
  }, []);

export const listOfStatuses = [
  Status.APPROVED,
  Status.DRAFT,
  Status.WAITING_FOR_APPROVAL,
  Status.DECLINED,
  Status.COMPLETED,
  Status.OVERDUE,
  Status.STARTED,
  Status.NOT_STARTED,
  Status.NOT_CREATED,
];

export const convertToLink = (str) => str.split('_').slice(1).join('-').toLowerCase();

export const metaStatuses = [
  MetaDataReport.MYR_SUBMITTED_PERCENTAGE,
  MetaDataReport.MYR_APPROVED_PERCENTAGE,
  MetaDataReport.EYR_SUBMITTED_PERCENTAGE,
  MetaDataReport.EYR_APPROVED_PERCENTAGE,
  MetaDataReport.FEEDBACK_REQUESTED_PERCENTAGE,
  MetaDataReport.FEEDBACK_GIVEN_PERCENTAGE,
  MetaDataReport.OBJECTIVES_SUBMITTED_PERCENTAGE,
  MetaDataReport.OBJECTIVES_APPROVED_PERCENTAGE,
  MetaDataReport.MYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE,
  MetaDataReport.MYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT,
  MetaDataReport.MYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE,
  MetaDataReport.MYR_RATING_BREAKDOWN_SATISFACTORY_COUNT,
  MetaDataReport.MYR_RATING_BREAKDOWN_GREAT_PERCENTAGE,
  MetaDataReport.MYR_RATING_BREAKDOWN_GREAT_COUNT,
  MetaDataReport.MYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE,
  MetaDataReport.MYR_RATING_BREAKDOWN_OUTSTANDING_COUNT,
  MetaDataReport.EYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE,
  MetaDataReport.EYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT,
  MetaDataReport.EYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE,
  MetaDataReport.EYR_RATING_BREAKDOWN_SATISFACTORY_COUNT,
  MetaDataReport.EYR_RATING_BREAKDOWN_GREAT_PERCENTAGE,
  MetaDataReport.EYR_RATING_BREAKDOWN_GREAT_COUNT,
  MetaDataReport.EYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE,
  MetaDataReport.EYR_RATING_BREAKDOWN_OUTSTANDING_COUNT,
  MetaDataReport.NEW_TO_BUSINESS_COUNT,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_1_PERCENTAGE,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_1_COUNT,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_2_PERCENTAGE,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_2_COUNT,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_3_PERCENTAGE,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_3_COUNT,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_4_PERCENTAGE,
  MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_4_COUNT,
  MetaDataReport.COLLEAGUES_COUNT,
];

export const statisticsReport = {
  [StatisticsTitlesReport.COLLEAGUES_COUNT]: [MetaDataReport.COLLEAGUES_COUNT],
  [StatisticsTitlesReport.OBJECTIVES_SUBMITTED]: [MetaDataReport.OBJECTIVES_SUBMITTED_PERCENTAGE],
  [StatisticsTitlesReport.OBJECTIVES_APPROVED]: [MetaDataReport.OBJECTIVES_APPROVED_PERCENTAGE],
  [StatisticsTitlesReport.MID_YEAR_FORMS]: [
    MetaDataReport.MYR_SUBMITTED_PERCENTAGE,
    MetaDataReport.MYR_APPROVED_PERCENTAGE,
  ],
  [StatisticsTitlesReport.BREAKDOWN_OF_MID_YEAR_RATINGS]: [
    MetaDataReport.MYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT,
    MetaDataReport.MYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_SATISFACTORY_COUNT,
    MetaDataReport.MYR_RATING_BREAKDOWN_GREAT_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_GREAT_COUNT,
    MetaDataReport.MYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE,
    MetaDataReport.MYR_RATING_BREAKDOWN_OUTSTANDING_COUNT,
  ],
  [StatisticsTitlesReport.YEAR_END_FORMS]: [
    MetaDataReport.EYR_SUBMITTED_PERCENTAGE,
    MetaDataReport.EYR_APPROVED_PERCENTAGE,
  ],
  [StatisticsTitlesReport.BREAKDOWN_OF_YEAR_END_RATINGS]: [
    MetaDataReport.EYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT,
    MetaDataReport.EYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_SATISFACTORY_COUNT,
    MetaDataReport.EYR_RATING_BREAKDOWN_GREAT_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_GREAT_COUNT,
    MetaDataReport.EYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE,
    MetaDataReport.EYR_RATING_BREAKDOWN_OUTSTANDING_COUNT,
  ],
  [StatisticsTitlesReport.IN_THE_MOMENT_FEEDBACK]: [
    MetaDataReport.FEEDBACK_REQUESTED_PERCENTAGE,
    MetaDataReport.FEEDBACK_GIVEN_PERCENTAGE,
  ],
  [StatisticsTitlesReport.NEW_TO_BUSINESS]: [MetaDataReport.NEW_TO_BUSINESS_COUNT],
  [StatisticsTitlesReport.ANNIVERSARY_REVIEWS]: [
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_1_PERCENTAGE,
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_1_COUNT,
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_2_PERCENTAGE,
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_2_COUNT,
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_3_PERCENTAGE,
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_3_COUNT,
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_4_PERCENTAGE,
    MetaDataReport.ANNIVERSARY_REVIEW_PER_QUARTER_4_COUNT,
  ],
};

export const checkboxes = (t, fields) => [
  {
    id: '1',
    label: t(StatisticsTitlesReportKeys.OBJECTIVES_SUBMITTED),
    isChecked: false,
  },
  {
    id: '2',
    label: t(StatisticsTitlesReportKeys.OBJECTIVES_APPROVED),
    isChecked: false,
  },
  {
    id: '3',
    label: t(StatisticsTitlesReportKeys.MID_YEAR_FORMS),
    isChecked: false,
  },
  {
    id: '4',
    label: t(StatisticsTitlesReportKeys.BREAKDOWN_OF_MID_YEAR_RATINGS),
    isChecked: false,
  },
  {
    id: '5',
    label: t(StatisticsTitlesReportKeys.YEAR_END_FORMS),
    isChecked: false,
  },
  {
    id: '6',
    label: t(StatisticsTitlesReportKeys.BREAKDOWN_OF_YEAR_END_RATINGS),
    isChecked: false,
  },
  {
    id: '7',
    label: t(StatisticsTitlesReportKeys.IN_THE_MOMENT_FEEDBACK),
    isChecked: false,
  },

  {
    id: '8',
    label: t(StatisticsTitlesReportKeys.BUSINESS),
    isChecked: false,
  },

  {
    id: '9',
    label: t(StatisticsTitlesReportKeys.ANNIVERSARY_REVIEWS),
    isChecked: false,
  },
  ...fields,
];

export const getWLFields = (t) => [
  { id: '10', label: t(StatisticsTitlesReportKeys.WL4And5), isChecked: false },
  getSelectAllField(t),
];

export const getSelectAllField = (t) => ({ id: '11', label: t('select_all', 'Select All'), isChecked: false });

export const initialValues = [
  {
    title: 'Work level',
    data: [
      { title: 'Select All' },
      { title: 'Colleagues' },
      { title: 'Work level 1' },
      { title: 'Work level 2' },
      { title: 'Work level 3' },
    ],
  },
  {
    title: 'Operational areas',
    data: [
      { title: 'Select All' },
      { title: 'Objectives' },
      { title: 'PDP' },
      { title: 'Mid-year Review' },
      { title: 'End-year Review' },
    ],
  },
  {
    title: 'Gender',
    data: [{ title: 'Select All' }, { title: 'Male' }, { title: 'Female' }],
  },
];

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

export const getCurrentValue = (query, year) =>
  query.year ? year || query.year || getCurrentYear() : year || getCurrentYear();
