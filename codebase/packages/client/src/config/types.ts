import { colors } from '@pma/dex-wrapper';
import { ReviewType, Status, TimelineType } from './enum';

export type Colors = keyof typeof colors;

type TimelineStatisticItem = {
  count: string;
  lastUpdatedTime: string;
};

export type TimelineStatistics = {
  APPROVED?: TimelineStatisticItem;
  DRAFT?: TimelineStatisticItem;
  WAITING_FOR_APPROVAL?: TimelineStatisticItem;
  DECLINED?: TimelineStatisticItem;
  WAITING_FOR_COMPLETION?: TimelineStatisticItem;
  REQUESTED_TO_AMEND?: TimelineStatisticItem;
  COMPLETED?: TimelineStatisticItem;
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
  properties: any;
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

export enum Mode {
  SAVE = 'save',
  UPDATE = 'update',
  CREATE = 'create',
}

export { ReviewType, Status, TimelineType };
