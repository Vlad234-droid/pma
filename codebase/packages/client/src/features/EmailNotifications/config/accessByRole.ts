import { setting } from '../constants';
import { role } from '../../Permission';

export const accessByRole = {
  [setting.LM_OBJECTIVES_APPROVED_FOR_SHARING]: [role.LINE_MANAGER],
  [setting.BEFORE_CYCLE_END_COLLEAGUE]: [role.LINE_MANAGER],
  [setting.MID_YEAR_SUBMISSION]: [role.LINE_MANAGER],
  [setting.YEAR_END_SUBMISSION]: [role.LINE_MANAGER],
  [setting.BEFORE_CYCLE_START_LM]: [role.LINE_MANAGER],
  [setting.BEFORE_CYCLE_END_LM]: [role.LINE_MANAGER],
  [setting.OBJECTIVE_SUBMITTED]: [role.LINE_MANAGER],
};
