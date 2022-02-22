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
}

export enum ObjectiveType {
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
}

export enum ReviewType {
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

export enum FileId {
  BPMN = 1,
  FORM,
  PDF,
  PPT,
  XLS,
  DMN,
  DOC,
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
export enum FeedbackRequestStatus {
  DRAFT = '1',
  SUBMITTED = '2',
  PENDING = '3',
  COMPLETED = '4',
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
  BELOW_EXPECTED = 'below_expected',
  SATISFACTORY = 'satisfactory',
  GREAT = 'great',
  OUTSTANDING = 'outstanding',
  COLLEAGUES = 'colleagues',
  QUARTER_1 = 'quarter_1',
  QUARTER_2 = 'quarter_2',
  QUARTER_3 = 'quarter_3',
  QUARTER_4 = 'quarter_4',
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
  EYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE = 'eyr-rating-breakdown-below-expected-count',
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
  MOMENT_FEEDBACK = 'moment_feedback',
}
