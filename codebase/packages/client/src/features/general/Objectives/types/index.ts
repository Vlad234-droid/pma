import { Status, ReviewType } from 'config/enum';
import { Component } from '@pma/store';

type Explanation = {
  title: string;
  description?: string;
};

type Objective = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  explanations: Explanation[];
  declineReason?: string;
  status: Status;
  lastUpdatedTime: string;
  uuid: string;
};

type Review = {
  changeStatusReason: string;
  lastUpdatedTime: string;
  colleagueUuid: string;
  number: 1;
  performanceCycleUuid: string;
  properties: Record<string, string>;
  status: Status;
  type: ReviewType;
  uuid: string;
};

interface BorderedComponent extends Component {
  borderStyle?: Record<string, string>;
  level?: number;
}

export type { Review, Objective, Explanation, BorderedComponent };
