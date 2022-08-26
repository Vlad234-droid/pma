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
  SINGLE_MODIFY = 'SINGLE_MODIFY',
  PREVIEW = 'PREVIEW',
  SUBMITTED = 'SUBMITTED',
}
