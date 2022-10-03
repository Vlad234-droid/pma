import { Status } from 'config/enum';

export type Objective = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  status: Status;
  lastUpdatedTime: string;
  uuid: string;
};
