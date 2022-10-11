import { Timeline } from '@pma/client/src/config/types';
import { Meta } from '../../config/types';

export type RequestPayload = {
  colleagueUuid: string;
  cycleUuid: string;
};

export type SuccessPayload = {
  success: boolean;
  colleagueUuid: string;
  data: Timeline[];
};

export type ErrorPayload = Error;

export type CancelPayload = undefined;

export type State = {
  meta: Meta;
  success?: boolean;
  data?: Record<string, Timeline[]>;
};
