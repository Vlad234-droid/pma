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

export enum FeedbackArea {
  OBJECTIVES = 'Objectives',
}

export enum TargetType {
  'Objectives' = 'OBJECTIVE',
  'Development goal' = 'GOAL',
  'Value and behaviour' = 'VALUE_BEHAVIOR',
  'Other' = 'OTHER',
}

export enum TargetTypeReverse {
  'OBJECTIVE' = 'Objectives',
  'GOAL' = 'Development goal',
  'VALUE_BEHAVIOR' = 'Value and behaviour',
  'OTHER' = 'Other',
}

export enum BusinessType {
  Office = 'Office',
}
