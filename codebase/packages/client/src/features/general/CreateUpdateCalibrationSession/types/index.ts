import { CalibrationSession, ColleagueSimple } from '@pma/openapi';

export type CalibrationSessionUiType = CalibrationSession & {
  colleaguesRemoved: any;
  colleaguesAdd: any;
  filter: any;
};

export enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
  DISABLED = 'disabled',
}

export interface ColleagueSimpleExtended extends ColleagueSimple {
  type?: ActionType;
}
