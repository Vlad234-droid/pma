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

export enum TargetFeedbackKeys {
  'GOAL' = 'comment_to_day_job',
  'VALUE_BEHAVIOR' = 'comment_to_your_self',
  'OTHER' = 'comment_to_your_impact',
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
}
