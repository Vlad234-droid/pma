export enum Status {
  PENDING = 'PENDING',
  DRAFT = 'DRAFT',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
  APPROVED = 'APPROVED',
  OVERDUE = 'OVERDUE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  AVAILABLE = 'AVAILABLE',
  RETURNED = 'RETURNED',
  DECLINED = 'DECLINED',
  COMPLETED = 'COMPLETED',
  STARTED = 'STARTED',
  NOT_STARTED = 'NOT_STARTED',
  NOT_CREATED = 'NOT_CREATED',
  FINISHING = 'FINISHING',
  WAITING_FOR_COMPLETION = 'WAITING_FOR_COMPLETION',
  REQUESTED_TO_AMEND = 'REQUESTED_TO_AMEND',
}

export enum ActionStatus {
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  APPROVED = 'APPROVED',
  APPROVE_DECLINED = 'APPROVE_DECLINED',
  COMPLETE_DECLINED = 'COMPLETE_DECLINED',
}

// todo use for timeline this statuses. should be changed in many places
export enum TimelineStatus {
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
  STARTED = 'STARTED',
  NOT_STARTED = 'NOT_STARTED',
  SCHEDULED = 'SCHEDULED',
  FINISHING = 'FINISHING',
}

export enum ReviewType {
  QUARTER = 'QUARTER',
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
}
export enum ReportType {
  NTB = 'NEW_TO_BUSINESS',
  FEEDBACK = 'FEEDBACK',
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
}

export enum PDPType {
  PDP = 'PDP',
  MYR = 'MYR',
  EYR = 'EYR',
}

export enum TimelineType {
  REVIEW = 'REVIEW',
  ELEMENT = 'ELEMENT',
  TIMELINE_POINT = 'TIMELINE_POINT',
  CYCLE = 'CYCLE',
}

export enum FileDescription {
  BPMN = 'Business Process Model file',
  FORM = 'FORM',
  PDF = 'Portable document format file',
  PPT = 'PowerPoint presentation file',
  XLS = 'Excel file',
  DMN = 'Decision Matrix file',
  DOC = 'Word document',
}

export enum FileExtensions {
  BPMN = 'BPMN',
  FORM = 'FORM',
  PDF = 'PDF',
  PPT = 'PPT',
  XLS = 'XLS',
  DMN = 'DMN',
  DOC = 'DOC',
}

export enum SortFileValue {
  newToOld = 'created-time:DESC',
  oldToNew = 'created-time:ASC',
  AZ = 'file-name:ASC',
  ZA = 'file-name:DESC',
}

export enum SortFeedbackValue {
  newToOld = 'updated-time:DESC',
  oldToNew = 'updated-time:ASC',
  AZ = 'target-colleague-first-name:ASC',
  ZA = 'target-colleague-first-name:DESC',
}

export enum FeedbackStatus {
  SUBMITTED = 'SUBMITTED',
  PENDING = 'PENDING',
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
}
export enum FEEDBACK_STATUS_IN {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum FeedbackShema {
  MAX_LENGTH = 10000,
  MIN_LENGTH = 10,
}

export enum TargetType {
  'id_1' = 'GOAL',
  'id_2' = 'OBJECTIVE',
  'id_3' = 'VALUE_BEHAVIOR',
  'id_4' = 'OTHER',
}

export enum TargetTypeReverse {
  'GOAL' = 'Day Job',
  'OBJECTIVE' = 'Objectives',
  'VALUE_BEHAVIOR' = 'Yourself (development goals, values & purpose)',
  'OTHER' = 'Your impact on others',
}

export enum Tesco {
  TescoBank = 'Tesco Bank: Big 6',
}

export enum TargetFeedbackKeys {
  'GOAL' = 'comment_to_day_job',
  'VALUE_BEHAVIOR' = 'comment_to_your_self',
  'OTHER' = 'comment_to_your_impact',
  'OBJECTIVE' = 'comment_to_objective',
}

export enum Rating {
  BELOW_EXPECTED = 'Below expected',
  SATISFACTORY = 'Satisfactory',
  GREAT = 'Great',
  OUTSTANDING = 'Outstanding',
  COLLEAGUES = 'colleagues',
  QUARTER_1 = 'has_eyr_approved_1_quarter',
  QUARTER_2 = 'has_eyr_approved_2_quarter',
  QUARTER_3 = 'has_eyr_approved_3_quarter',
  QUARTER_4 = 'has_eyr_approved_4_quarter',
}

export enum MetaDataReport {
  MYR_SUBMITTED_PERCENTAGE = 'myr-submitted-percentage',
  MYR_APPROVED_PERCENTAGE = 'myr-approved-percentage',
  EYR_SUBMITTED_PERCENTAGE = 'eyr-submitted-percentage',
  EYR_APPROVED_PERCENTAGE = 'eyr-approved-percentage',
  FEEDBACK_REQUESTED_PERCENTAGE = 'feedback-requested-percentage',
  FEEDBACK_GIVEN_PERCENTAGE = 'feedback-given-percentage',
  OBJECTIVES_SUBMITTED_PERCENTAGE = 'objectives-submitted-percentage',
  OBJECTIVES_APPROVED_PERCENTAGE = 'objectives-approved-percentage',
  MYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE = 'myr-rating-breakdown-below-expected-percentage',
  MYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT = 'myr-rating-breakdown-below-expected-count',
  MYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE = 'myr-rating-breakdown-satisfactory-percentage',
  MYR_RATING_BREAKDOWN_SATISFACTORY_COUNT = 'myr-rating-breakdown-satisfactory-count',
  MYR_RATING_BREAKDOWN_GREAT_PERCENTAGE = 'myr-rating-breakdown-great-percentage',
  MYR_RATING_BREAKDOWN_GREAT_COUNT = 'myr-rating-breakdown-great-count',
  MYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE = 'myr-rating-breakdown-outstanding-percentage',
  MYR_RATING_BREAKDOWN_OUTSTANDING_COUNT = 'myr-rating-breakdown-outstanding-count',
  EYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE = 'eyr-rating-breakdown-below-expected-percentage',
  EYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT = 'eyr-rating-breakdown-below-expected-count',
  EYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE = 'eyr-rating-breakdown-satisfactory-percentage',
  EYR_RATING_BREAKDOWN_SATISFACTORY_COUNT = 'eyr-rating-breakdown-satisfactory-count',
  EYR_RATING_BREAKDOWN_GREAT_PERCENTAGE = 'eyr-rating-breakdown-great-percentage',
  EYR_RATING_BREAKDOWN_GREAT_COUNT = 'eyr-rating-breakdown-great-count',
  EYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE = 'eyr-rating-breakdown-outstanding-percentage',
  EYR_RATING_BREAKDOWN_OUTSTANDING_COUNT = 'eyr-rating-breakdown-outstanding-count',
  NEW_TO_BUSINESS_COUNT = 'new-to-business-count',
  ANNIVERSARY_REVIEW_PER_QUARTER_1_PERCENTAGE = 'anniversary-review-per-quarter-1-percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_1_COUNT = 'anniversary-review-per-quarter-1-count',
  ANNIVERSARY_REVIEW_PER_QUARTER_2_PERCENTAGE = 'anniversary-review-per-quarter-2-percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_2_COUNT = 'anniversary-review-per-quarter-2-count',
  ANNIVERSARY_REVIEW_PER_QUARTER_3_PERCENTAGE = 'anniversary-review-per-quarter-3-percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_3_COUNT = 'anniversary-review-per-quarter-3-count',
  ANNIVERSARY_REVIEW_PER_QUARTER_4_PERCENTAGE = 'anniversary-review-per-quarter-4-percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_4_COUNT = 'anniversary-review-per-quarter-4-count',
  COLLEAGUES_COUNT = 'colleagues-count',
}

export enum TitlesReport {
  OBJECTIVES_SUBMITTED = 'objectives_submitted',
  WL4And5 = 'WL4_and_5',
  MYR = 'review_type_description_myr',
  EYR = 'review_type_description_eyr',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REQUESTED = 'requested',
  GIVEN = 'given',
  OBJECTIVES_APPROVED = 'objectives_approved',
  MYR_BREAKDOWN = 'myr_breakdown',
  EYR_BREAKDOWN = 'eyr_breakdown',
  BUSINESS = 'new_to_business',
  ANNIVERSARY_REVIEWS = 'anniversary_reviews',
  HOURLY_PAID = 'hourly_paid',
  MOMENT_FEEDBACK = 'everyday_feedback',
}

export enum StatisticsTitlesReportKeys {
  OBJECTIVES_SUBMITTED = 'objectives_submitted',
  OBJECTIVES_APPROVED = 'objectives_approved',
  MID_YEAR_FORMS = 'mid_year_forms',
  BREAKDOWN_OF_MID_YEAR_RATINGS = 'breakdown_of_mid_year_ratings',
  YEAR_END_FORMS = 'year_end_forms',
  BREAKDOWN_OF_YEAR_END_RATINGS = 'breakdown_of_year_end_ratings',
  IN_THE_MOMENT_FEEDBACK = 'everyday_feedback',
  BUSINESS = 'new_to_business',
  ANNIVERSARY_REVIEWS = 'anniversary_reviews',
  WL4And5 = 'WL4_and_5',
}

export enum StatisticsTitlesReport {
  COLLEAGUES_COUNT = 'Colleagues count',
  OBJECTIVES_SUBMITTED = 'Objectives submitted',
  OBJECTIVES_APPROVED = 'Objectives approved',
  MID_YEAR_FORMS = 'Mid-year forms',
  BREAKDOWN_OF_MID_YEAR_REVIEW = 'Breakdown of mid-year review',
  YEAR_END_FORMS = 'Year-end forms',
  BREAKDOWN_OF_YEAR_END_REVIEW = 'Breakdown of year-end review',
  IN_THE_MOMENT_FEEDBACK = 'Everyday Feedback',
  NEW_TO_BUSINESS = 'New to business',
  ANNIVERSARY_REVIEWS = 'Anniversary Reviews completed per quarter',
}

export enum ReportPage {
  REPORT_SUBMITTED_OBJECTIVES = 'REPORT_SUBMITTED_OBJECTIVES',
  REPORT_APPROVED_OBJECTIVES = 'REPORT_APPROVED_OBJECTIVES',
  REPORT_MID_YEAR_REVIEW = 'REPORT_MID_YEAR_REVIEW',
  REPORT_END_YEAR_REVIEW = 'REPORT_END_YEAR_REVIEW',
  REPORT_WORK_LEVEL = 'REPORT_WORK_LEVEL',
  REPORT_FEEDBACK = 'REPORT_FEEDBACK',
  REPORT_EYR_BREAKDOWN = 'REPORT_EYR_BREAKDOWN',
  REPORT_MYR_BREAKDOWN = 'REPORT_MYR_BREAKDOWN',
  REPORT_ANNIVERSARY_REVIEWS = 'REPORT_ANNIVERSARY_REVIEWS',
  REPORT_NEW_TO_BUSINESS = 'REPORT_NEW_TO_BUSINESS',
}

export enum SearchOption {
  NAME = 'NAME',
  EMAIL = 'EMAIL',
}

export enum BurgerEntryType {
  TOP = 'burger-menu-top',
  BOTTOM = 'burger-menu-bottom',
}

export enum Tenant {
  GENERAL = 'general',
  BANK = 'bank',
}

export enum CycleType {
  HIRING = 'HIRING',
  FISCAL = 'FISCAL',
}
