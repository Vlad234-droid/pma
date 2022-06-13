import { role } from 'features/general/Permission';
import { setting } from '../constants';

export const accessByRole = {
  [setting.LM_OBJECTIVES_APPROVED_FOR_SHARING]: [role.LINE_MANAGER],
  [setting.BEFORE_CYCLE_END_COLLEAGUE]: [role.LINE_MANAGER],
  [setting.BEFORE_CYCLE_END_LM]: [role.LINE_MANAGER],
  [setting.LM_SHARING_START]: [role.COLLEAGUE],
  [setting.LM_SHARING_END]: [role.COLLEAGUE],
  [setting.FEEDBACK_GIVEN]: [role.COLLEAGUE],
  [setting.RESPOND_TO_FEEDBACK]: [role.COLLEAGUE],
  [setting.REQUESTS_REQUEST_FEEDBACK]: [role.COLLEAGUE],
  [setting.MID_YEAR_SUBMISSION]: [role.LINE_MANAGER],
  [setting.YEAR_END_BEFORE_YEAR_END_START]: [role.COLLEAGUE],
  [setting.YEAR_END_SUBMISSION]: [role.LINE_MANAGER],
  [setting.YEAR_END_APPROVAL]: [role.COLLEAGUE],
  [setting.YEAR_END_DECLINED]: [role.COLLEAGUE],
  [setting.YEAR_END_BEFORE_REVIEW_END]: [role.COLLEAGUE],
  [setting.BEFORE_CYCLE_START_COLLEAGUE]: [role.COLLEAGUE],
  [setting.BEFORE_CYCLE_START_LM]: [role.LINE_MANAGER],
  [setting.BEFORE_CYCLE_END_COLLEAGUE]: [role.COLLEAGUE],
  [setting.BEFORE_CYCLE_END_LM]: [role.LINE_MANAGER],
  [setting.OBJECTIVE_SUBMITTED]: [role.LINE_MANAGER],
};
