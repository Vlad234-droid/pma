import { StateType } from 'typesafe-actions';
import { initialState as userInitialState } from '../entities/user/reducer';
import { initialState as toastInitialState } from '../entities/toast/reducer';
import { initialState as objectiveInitialState } from '../entities/objective/reducer';
import { initialState as orgObjectiveInitialState } from 'entities/orgObjective/reducer';
import { initialState as schemaInitialState } from '../entities/schema/reducer';
import { initialState as timelineInitialState } from '../entities/timeline/reducer';
import { initialState as managersInitialState } from '../entities/managers/reducer';
import { initialState as feedbackInitialState } from '../entities/feedback/reducer';
import { initialState as colleaguessState } from '../entities/colleagues/reducer';
import { initialState as reviewsInitialState } from '../entities/reviews/reducer';
import { initialState as objectiveSharingState } from '../entities/objectiveSharing/reducer';
import { initialState as tipsInitialState } from '../entities/tips/reducer';

//@ts-ignore
export const initialState = {
  users: userInitialState,
  toasts: toastInitialState,
  objectives: objectiveInitialState,
  orgObjectives: orgObjectiveInitialState,
  schema: schemaInitialState,
  timeline: timelineInitialState,
  managers: managersInitialState,
  feedback: feedbackInitialState,
  colleagues: colleaguessState,
  reviewsInitialState: reviewsInitialState,
  objectivesSharing: objectiveSharingState,
  tips: tipsInitialState,
};

export type State = StateType<typeof initialState>;
