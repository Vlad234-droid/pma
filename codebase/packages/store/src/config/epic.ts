import { combineEpics } from 'redux-observable';
import userEpic from '../entities/user/epic';
import objectiveEpic from '../entities/objective/epic';
import orgObjectiveEpic from '../entities/orgObjective/epic';
import schemaEpic from '../entities/schema/epic';
import timelineEpic from '../entities/timeline/epic';
import managersEpic from '../entities/managers/epic';
import feedBackEpic from '../entities/feedback/epic';
import colleaguesEpic from '../entities/colleagues/epic';
import reviewsEpic from '../entities/reviews/epic';
import objectiveSharingEpic from '../entities/objectiveSharing/epic';
import tipsEpic from '../entities/tips/epic';
import performanceCycleEpic from '../entities/performanceCycle/epic';
import configEntriesEpic from '../entities/configEntries/epic';
import processTemplateEpic from '../entities/processTemplate/epic';

export const rootEpic = combineEpics(
  userEpic,
  schemaEpic,
  objectiveEpic,
  orgObjectiveEpic,
  timelineEpic,
  managersEpic,
  feedBackEpic,
  colleaguesEpic,
  reviewsEpic,
  objectiveSharingEpic,
  tipsEpic,
  performanceCycleEpic,
  configEntriesEpic,
  processTemplateEpic,
);
