import { combineEpics } from 'redux-observable';
import userEpic from '../entities/user/epic';
import objectiveEpic from '../entities/objective/epic';
import schemaEpic from '../entities/schema/epic';
import timelineEpic from '../entities/timeline/epic';
import managersEpic from '../entities/managers/epic';
import feedBackEpic from '../entities/feedback/epic';
import colleaguesEpic from '../entities/colleagues/epic';
import reviewsEpic from '../entities/reviews/epic';

export const rootEpic = combineEpics(
  userEpic,
  schemaEpic,
  objectiveEpic,
  timelineEpic,
  managersEpic,
  feedBackEpic,
  colleaguesEpic,
  reviewsEpic,
);
