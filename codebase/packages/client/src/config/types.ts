import { BusinessType, ReviewType, Status, TimelineType } from './enum';

export type Timeline = {
  code: string; // TODO: set correct type
  colleagueCycleUuid: string;
  count: number;
  description: string;
  endTime: string | null;
  reviewType: ReviewType;
  startTime: string | null;
  status: Status;
  type: TimelineType;
  uuid: string;
};

export type Review = {
  number: string;
  status: Status;
  type: ReviewType;
  uuid: string;
};

export type ReviewForApproval = {
  businessType: BusinessType;
  firstName: string;
  jobName: string;
  lastName: string;
  middleName: string | null;
  uuid: string;
  reviews: Review[];
  timeline: Timeline[];
};
