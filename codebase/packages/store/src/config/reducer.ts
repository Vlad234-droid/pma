import { combineReducers } from 'redux';

import userReducer from '../entities/user/reducer';
import toastReducer from '../entities/toast/reducer';
import objectiveReducer from '../entities/objective/reducer';
import orgObjectiveReducer from '../entities/orgObjective/reducer';
import schemaReducer from '../entities/schema/reducer';
import timelineReducer from '../entities/timeline/reducer';
import managersReducer from '../entities/managers/reducer';
import feedbackReducer from '../entities/feedback/reducer';
import colleaguesReducer from '../entities/colleagues/reducer';
import reviewsReducer from '../entities/reviews/reducer';
import objectiveSharingReducer from '../entities/objectiveSharing/reducer';
import tipsReducer from '../entities/tips/reducer';

export const rootReducer = combineReducers({
  users: userReducer,
  toasts: toastReducer,
  objectives: objectiveReducer,
  orgObjectives: orgObjectiveReducer,
  schema: schemaReducer,
  timeline: timelineReducer,
  managers: managersReducer,
  feedback: feedbackReducer,
  colleagues: colleaguesReducer,
  reviews: reviewsReducer,
  objectivesSharing: objectiveSharingReducer,
  tips: tipsReducer,
});
