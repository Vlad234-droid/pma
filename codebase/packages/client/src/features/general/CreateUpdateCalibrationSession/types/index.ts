import { CalibrationSession, ColleagueSimple } from '@pma/openapi';

export type CalibrationSessionUiType = CalibrationSession & {
  colleaguesRemoved: any;
  colleaguesAdd: any;
  filter: any;
};

export interface ColleagueSimpleExtended extends ColleagueSimple {
  type?: 'add' | 'remove' | 'disabled';
}
