import { ReviewType } from 'config/enum';
import { setting } from '../constants';

export const accessByTimelinePoints = {
  [setting.MID_YEAR_BEFORE_REVIEW_START]: [ReviewType.MYR],
  [setting.MID_YEAR_APPROVAL]: [ReviewType.MYR],
  [setting.MID_YEAR_DECLINED]: [ReviewType.MYR],
  [setting.MID_YEAR_BEFORE_REVIEW_END]: [ReviewType.MYR],
  [setting.OBJECTIVE_APPROVED]: [ReviewType.OBJECTIVE],
  [setting.OBJECTIVE_DECLINED]: [ReviewType.OBJECTIVE],
};
