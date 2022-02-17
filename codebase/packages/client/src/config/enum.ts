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

export enum VoiceType {
  'id_1' = 'Direct and simple',
  'id_2' = 'Friendly and constructive',
  'id_3' = 'Informative and detailed',
  'id_4' = 'I don`t have a preference',
}

export enum Rating {
  BELOW_EXPECTED = 'Below expected',
  SATISFACTORY = 'Satisfactory',
  GREAT = 'Great',
  OUTSTANDING = 'Outstanding',
  COLLEAGUES = 'Colleagues',
  QUARTER_1 = 'Quarter 1',
  QUARTER_2 = 'Quarter 2',
  QUARTER_3 = 'Quarter 3',
  QUARTER_4 = 'Quarter 4',
}

export enum MetaDataReport {
  MYR_SUBMITTED_PERCENTAGE = 'MyrSubmittedPercentage',
  MYR_APPROVEDPERCENTAGE = 'MyrApprovedPercentage',
  EYR_SUBMITTED_PERCENTAGE = 'EyrSubmittedPercentage',
  EYR_APPROVED_PERCENTAGE = 'EyrApprovedPercentage',
  FEEDBACK_REQUESTED_PERCENTAGE = 'FeedbackRequestedPercentage',
  FEEDBACK_GIVEN_PERCENTAGE = 'FeedbackGivenPercentage',
  OBJECTIVE_SUBMITTED_PERCENTAGE = 'ObjectivesSubmittedPercentage',
  OBJECTIVES_APPROVED_PERCENTAGE = 'ObjectivesApprovedPercentage',
  MYER_RATING_BREAKDONW_BELOW_EXPECTED_PERCENTAGE = 'MyrRatingBreakdownBelowExpectedPercentage',
  MYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT = 'MyrRatingBreakdownBelowExpectedCount',
  MYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE = 'MyrRatingBreakdownSatisfactoryPercentage',
  MYRRATING_BREAKDOWN_SATISFACTORY_COUNT = 'MyrRatingBreakdownSatisfactoryCount',
  MYR_RATING_BREAKDOWN_GREAT_PERCENTAGE = 'MyrRatingBreakdownGreatPercentage',
  MYR_RATING_BREAKDOWN_GREAT_COUNT = 'MyrRatingBreakdownGreatCount',
  MYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE = 'MyrRatingBreakdownOutstandingPercentage',
  MYR_RATING_BREAKDONW_OUTSTANDING_COUNT = 'MyrRatingBreakdownOutstandingCount',
  EYR_RATING_BREAKDOWN_BELOW_EXPECTED_PERCENTAGE = 'EyrRatingBreakdownBelowExpectedPercentage',
  EYR_RATING_BREAKDOWN_BELOW_EXPECTED_COUNT = 'EyrRatingBreakdownBelowExpectedCount',
  EYR_RATING_BREAKDOWN_SATISFACTORY_PERCENTAGE = 'EyrRatingBreakdownSatisfactoryPercentage',
  EYR_RATING_BREAKDOWN_SATISFACTORY_COUNT = 'EyrRatingBreakdownSatisfactoryCount',
  EYR_RATING_BREAKDOWN_GREAT_PERCENTAGE = 'EyrRatingBreakdownGreatPercentage',
  EYR_RATING_BREAKDOWN_GREAT_COUNT = 'EyrRatingBreakdownGreatCount',
  EYR_RATING_BREAKDOWN_OUTSTANDING_PERCENTAGE = 'EyrRatingBreakdownOutstandingPercentage',
  EYR_RATING_BREAKDOWN_OUTSTANDING_COUNT = 'EyrRatingBreakdownOutstandingCount',
  NEW_TO_BUSINESS_COUNT = 'NewToBusinessCount',
  ANNIVERSARY_REVIEW_PER_QUARTER_1_PERCENTAGE = 'AnniversaryReviewPerQuarter1Percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_1_COUNT = 'AnniversaryReviewPerQuarter1Count',
  ANNIVERSARY_REVIEW_PER_QUARTER_2_PERCENTAGE = 'AnniversaryReviewPerQuarter2Percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_2_COUNT = 'AnniversaryReviewPerQuarter2Count',
  ANNIVERSARY_REVIEW_PER_QUARTER_3_PERCENTAGE = 'AnniversaryReviewPerQuarter3Percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_3_COUNT = 'AnniversaryReviewPerQuarter3Count',
  ANNIVERSARY_REVIEW_PER_QUARTER_4_PERCENTAGE = 'AnniversaryReviewPerQuarter4Percentage',
  ANNIVERSARY_REVIEW_PER_QUARTER_4_COUNT = 'AnniversaryReviewPerQuarter4Count',
}

export enum TitlesReport {
  OBJECTIVES_SUBMITTED = 'Objectives submitted',
  WL4And5 = 'Wl4 & 5 Objectives submitted',
  MYR = 'Mid-year review',
  EYR = 'Year-end review',
  SUBMITTED = 'Submitted',
  APPROVED = 'Approved',
  REQUESTED = 'Requested',
  GIVEN = 'Given',
  OBJECTIVES_APPROVED = 'Objectives approved',
  MYR_BREAKDOWN = 'Breakdown of Mid-year ratings',
  EYR_BREAKDOWN = 'Breakdown of End-year ratings',
  BUSINESS = 'New to business',
  ANNIVERSARY_REVIEWS = 'Anniversary Reviews completed per quarter',
  HOURLY_PAID = 'Hourly paid colleagues only',
  MOMENT_FEEDBACK = 'In the moment feedback',
}
