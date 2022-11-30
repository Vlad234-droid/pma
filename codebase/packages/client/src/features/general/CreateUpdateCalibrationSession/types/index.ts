import { CalibrationSession } from '@pma/openapi';

export type CalibrationSessionUiType = CalibrationSession & {
  colleaguesRemoved: any;
  colleaguesAdd: any;
  filter: any;
};
