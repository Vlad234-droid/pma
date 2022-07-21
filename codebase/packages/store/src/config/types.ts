import { Styles } from '@pma/dex-wrapper';
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
  HTML_ELEMENT = 'htmlelement',
  DATETIME = 'datetime',
  TEXT_AREA = 'textarea',
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

export interface BorderedComponent extends Component {
  borderStyle?: Styles;
  level?: number;
}

// to rename after use new scheme
export interface ComponentV2 {
  id: string;
  key?: string;
  content?: string;
  label?: string;
  description?: string;
  type?: string;
  placeholder?: string;
  validate?: any;
  properties?: any;
  conditional?: any;
  data: { values?: { label?: string; value?: string }[] };
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
