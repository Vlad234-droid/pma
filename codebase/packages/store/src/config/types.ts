export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum ExpressionType {
  AUTH = 'auth',
  ROLE = 'role',
  WORK_LEVEL = 'work_level',
  REQUEST = 'request',
  LISTENER = 'listener',
  BLOCK = 'block',
  TAG = 'tag',
}

export enum ExpressionValueType {
  OBJECTIVE = 'OBJECTIVE',
  OPEN = 'open',
  CLOSE = 'close',
  OVERALL_RATING = 'overall_rating',
}

export enum FormType {
  TEXT_FIELD = 'textfield',
  SELECT = 'select',
  TEXT = 'text',
}

export enum FEEDBACK_STATUS_IN {
  DRAFT = 1,
  SUBMITTED,
  PENDING,
  COMPLETED,
}
