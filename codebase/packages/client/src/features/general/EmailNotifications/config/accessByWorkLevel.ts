import { setting } from '../constants';
import { workLevel } from '../../Permission';

export const accessByWorkLevel = {
  [setting.ORGANISATION_OBJECTIVES]: [workLevel.WL4, workLevel.WL5],
};
