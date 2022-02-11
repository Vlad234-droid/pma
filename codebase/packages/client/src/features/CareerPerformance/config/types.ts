import { ReviewType, Status, TimelineType } from 'config/enum';

export type Review = {
  code: ReviewType;
  colleagueCycleUuid: string;
  count: number;
  description: string;
  endTime: string | null;
  lastUpdatedTime: string;
  reviewType: ReviewType;
  startTime: string;
  status: Status;
  type: TimelineType;
  uuid: string;
  properties: {
    mapJson: Record<string, string>,
  }
};
