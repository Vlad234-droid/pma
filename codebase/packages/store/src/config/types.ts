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
  RADIO = 'radio',
}

export enum FEEDBACK_STATUS_IN {
  DRAFT = 1,
  SUBMITTED,
  PENDING,
  COMPLETED,
}

export enum WorkLevel {
  WL4 = 'WL4',
  WL5 = 'WL5',
}

export interface Component {
  id: string;
  key?: string;
  text?: string;
  label?: string;
  description?: string;
  type?: FormType | string;
  validate?: any;
  values?: { label?: string; value?: string }[];
  expression?: any;
}

export enum Folders {
  PERSONAL_FOLDER = 'PERSONAL_FOLDER',
  ARCHIVED_FOLDER = 'ARCHIVED_FOLDER',
  TEAM_ARCHIVED_FOLDER = 'TEAM_ARCHIVED_FOLDER',
  TEAM_FOLDER = 'TEAM_FOLDER',
}
export enum NoteStatus {
  CREATED = 'CREATED',
  ARCHIVED = 'ARCHIVED',
}
