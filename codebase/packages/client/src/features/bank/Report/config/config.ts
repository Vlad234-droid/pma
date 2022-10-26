export const convertToLink = (str) => str.split('_').slice(1).join('-').toLowerCase();

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

export enum View {
  CHART = 'chart',
  QUANTITY = 'quantity',
}
