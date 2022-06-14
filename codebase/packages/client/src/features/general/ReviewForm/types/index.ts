import { Status, ReviewType } from 'config/enum';
import { Component } from '@pma/store';

// type Explanation = {
//   title: string;
//   description?: string;
// };
//
// type Objective = {
//   id: number;
//   title: string;
//   subTitle: string;
//   description: string;
//   explanations: Explanation[];
//   declineReason?: string;
//   status: Status;
// };
//
// type Review = {
//   changeStatusReason: string;
//   colleagueUuid: string;
//   number: 1;
//   performanceCycleUuid: string;
//   properties: Record<string, string>;
//   status: Status;
//   type: ReviewType;
//   uuid: string;
// };

interface BorderedComponent extends Component {
  borderStyle?: Record<string, string>;
  level?: number;
}

export type { BorderedComponent };
