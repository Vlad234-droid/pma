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
}

export enum ExpressionValueType {
  OBJECTIVE = 'OBJECTIVE',
  OVERALL_RATING = 'overall_rating',
}

export enum FormType {
  TEXT_FIELD = 'textfield',
  SELECT = 'select',
  TEXT = 'text',
}
