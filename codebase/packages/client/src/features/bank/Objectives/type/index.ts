import { Status } from 'config/enum';

type Explanation = {
  title: string;
  description?: string;
};

export type Objective = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  status: Status;
  lastUpdatedTime: string;
  uuid: string;
  explanations?: Explanation[];
};
