import { colors } from '@pma/dex-wrapper';
import { ReviewType, Status, TimelineType } from './enum';

export type Colors = keyof typeof colors;

export type TimelineStatistics = {
  APPROVED?: string;
  DRAFT?: string;
  WAITING_FOR_APPROVAL?: string;
  DECLINED?: string;
  WAITING_FOR_COMPLETION?: string;
  REQUESTED_TO_AMEND?: string;
  COMPLETED?: string;
};

export type Timeline = {
  code: string;
  colleagueCycleUuid: string;
  cycleUuid: string;
  description: string;
  endTime: string;
  reviewType: ReviewType;
  startTime: string;
  status: Status; // todo change to TimelineStatus
  summaryStatus: Status; // todo change to TimelineStatus
  type: TimelineType;
  uuid: string;
  statistics?: TimelineStatistics;
  lastUpdatedTime?: string;
};

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

export type BaseEmployee = {
  uuid: string;
  firstName: string;
  jobName: string;
  lastName: string;
  middleName: string | null;
  businessType: string;
};

export type Employee = BaseEmployee & {
  reviews: Review[];
  timeline: Timeline[];
  manager?: string;
  lineManager?: BaseEmployee;
};

export type TimelineTypes = {
  [ReviewType.EYR]: boolean;
  [ReviewType.MYR]: boolean;
  [ReviewType.OBJECTIVE]: boolean;
};

export type UserprofileAttributes = {
  colleagueUuid: string;
  name: string;
  type: string;
  value: string;
};

export { ReviewType, Status, TimelineType };
