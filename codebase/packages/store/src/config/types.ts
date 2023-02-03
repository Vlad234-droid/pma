import { Styles } from '@pma/dex-wrapper';
import { PayloadAction } from 'typesafe-actions';

//TODO: split this file to enum interface and type

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum ReportTags {
  REPORT_SUBMITTED_OBJECTIVES = 'has_objective_submitted',
  REPORT_APPROVED_OBJECTIVES = 'has_objective_approved',
  REPORT_MID_YEAR_REVIEW = 'has_myr_submitted has_myr_approved',
  REPORT_END_YEAR_REVIEW = 'has_eyr_submitted has_eyr_approved',
  REPORT_WORK_LEVEL = 'REPORT_WORK_LEVEL',
  REPORT_FEEDBACK = 'has_feedback_requested has_feedback_given',
  REPORT_NEW_TO_BUSINESS = 'is_new_to_business',
  REPORT_MYR_BREAKDOWN = 'myr_overall_rating',
  REPORT_EYR_BREAKDOWN = 'eyr_overall_rating',
}

export enum ReportPage {
  REPORT_SUBMITTED_OBJECTIVES = 'REPORT_SUBMITTED_OBJECTIVES',
  REPORT_APPROVED_OBJECTIVES = 'REPORT_APPROVED_OBJECTIVES',
  REPORT_MID_YEAR_REVIEW = 'REPORT_MID_YEAR_REVIEW',
  REPORT_END_YEAR_REVIEW = 'REPORT_END_YEAR_REVIEW',
  REPORT_WORK_LEVEL = 'REPORT_WORK_LEVEL',
  REPORT_FEEDBACK = 'REPORT_FEEDBACK',
  REPORT_EYR_BREAKDOWN = 'REPORT_EYR_BREAKDOWN',
  REPORT_MYR_BREAKDOWN = 'REPORT_MYR_BREAKDOWN',
  REPORT_ANNIVERSARY_REVIEWS = 'REPORT_ANNIVERSARY_REVIEWS',
  REPORT_NEW_TO_BUSINESS = 'REPORT_NEW_TO_BUSINESS',
}

export enum ExpressionType {
  AUTH = 'auth',
  ROLE = 'role',
  DEPENDENCY = 'dependency',
  DEPENDENT = 'dependent',
  WORK_LEVEL = 'work_level',
  REQUEST = 'request',
  LISTENER = 'listener',
  BLOCK = 'block',
  TAG = 'tag',
  KEY = 'key',
  VALUE = 'value',
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

export interface ActionParams {
  pathParams?: any;
}

export interface ActionGetParams {
  searchParams?: any;
}

export interface ActionPostData {
  data?: any[];
  queryParams?: any;
}

export interface ReviewActionParams extends ActionPostData, ActionGetParams {
  pathParams: { colleagueUuid?: string; code?: string; cycleUuid: string; number?: number; status?: string };
}

export enum ReviewType {
  QUARTER = 'QUARTER',
  OBJECTIVE = 'OBJECTIVE',
  MYR = 'MYR',
  EYR = 'EYR',
  FEEDBACK = 'FEEDBACK',
  CALIBRATION = 'CALIBRATION',
}

export enum Statuses {
  PENDING = 'PENDING',
  FINISHING = 'FINISHING',
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
  WAITING_FOR_COMPLETION = 'WAITING_FOR_COMPLETION',
  REQUESTED_TO_AMEND = 'REQUESTED_TO_AMEND',
}

export type Review = {
  changeStatusReason: string;
  lastUpdatedTime: string;
  colleagueUuid: string;
  number: number;
  performanceCycleUuid: string;
  properties: Record<string, string>;
  status: Status;
  type: ReviewType;
  uuid: string;
  tlPointUuid: string;
};

export type ChartReport = {
  percentage: string;
  count?: string;
  title?: string;
};

export type ActionHandler<State, Payload = any> = (state: State, action: PayloadAction<string, Payload>) => State;

export type Meta = {
  loading: boolean;
  loaded: boolean;
  error: Error | null;
};
