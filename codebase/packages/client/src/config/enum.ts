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
}

export enum ObjectiveType {
  OBJECTIVE = 'Objectives',
  MYR = 'Mid Year Review',
  EYR = 'End of Year Review',
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
