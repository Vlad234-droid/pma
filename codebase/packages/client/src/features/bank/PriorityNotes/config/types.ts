import { ReviewType, Status } from 'config/enum';

export interface Priority {
  uuid: string;
  status: Status;
  type: ReviewType;
  properties: {
    title: string;
    description: string;
    strategic_driver: string;
  };
}
