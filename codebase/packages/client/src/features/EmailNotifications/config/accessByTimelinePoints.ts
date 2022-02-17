import { ObjectiveType } from 'config/enum';
import { setting } from '../constants';

export const accessByTimelinePoints = {
  [setting.MID_YEAR_BEFORE_REVIEW_START]: [ObjectiveType.MYR],
  [setting.MID_YEAR_APPROVAL]: [ObjectiveType.MYR],
  [setting.MID_YEAR_DECLINED]: [ObjectiveType.MYR],
  [setting.MID_YEAR_BEFORE_REVIEW_END]: [ObjectiveType.MYR],
  [setting.OBJECTIVE_APPROVED]: [ObjectiveType.OBJECTIVE],
  [setting.OBJECTIVE_DECLINED]: [ObjectiveType.OBJECTIVE],
};
