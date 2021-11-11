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
  QUARTER = 'Quarter year review',
  MYR = 'Mid year review',
  EYR = 'End year review',
}
