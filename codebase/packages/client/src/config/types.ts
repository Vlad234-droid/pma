import { colors } from '@pma/dex-wrapper';
import { ReviewType, Status, TimelineType } from './enum';

export type Colors = keyof typeof colors;

export type Timeline = {
  code: string;
  colleagueCycleUuid: string;
  count: number;
  description: string;
  endTime: string | null;
  reviewType: ReviewType;
  startTime: string | null;
  status: Status; // todo change to TimelineStatus
  summaryStatus: Status; // todo change to TimelineStatus
  type: TimelineType;
  uuid: string;
  statistics: Record<string, string> | null;
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
