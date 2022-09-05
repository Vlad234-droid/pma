import { Review } from 'config/types';

export type FormValues = Record<string | 'data', Objective[] | undefined>;

export type Objective = Partial<Review>;

export enum FormStateType {
  MODIFY = 'MODIFY',
  SINGLE_MODIFY = 'SINGLE_MODIFY',
  PREVIEW = 'PREVIEW',
  SUBMITTED = 'SUBMITTED',
  SAVED_AS_DRAFT = 'SAVED_AS_DRAFT',
}
