import { Status, ReviewType } from 'config/enum';

type Explanation = {
  title: string;
  steps: string[];
};

type Objective = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  explanations: Explanation[];
  declineReason?: string;
  status: Status;
};

type Review = {
  changeStatusReason: string;
  colleagueUuid: string;
  number: 1;
  performanceCycleUuid: string;
  properties: {
    mapJson: Record<string, string>;
  };
  status: Status;
  type: ReviewType;
  uuid: string;
};

export type { Review, Objective, Explanation };
