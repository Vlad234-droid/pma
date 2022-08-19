import { ReviewType, Status } from 'config/enum';

export type Objective = {
  number?: number;
  properties?: any;
  status?: Status;
  tlPointUuid?: string;
  type?: ReviewType.OBJECTIVE;
  uuid?: string;
};

export enum FormStateType {
  MODIFY = 'MODIFY',
  PREVIEW = 'PREVIEW',
  SUBMITTED = 'SUBMITTED',
}
