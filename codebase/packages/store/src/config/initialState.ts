import { StateType } from 'typesafe-actions';
import { initialState as userInitialState } from '../entities/user/reducer';
import { initialState as toastInitialState } from '../entities/toast/reducer';
import { initialState as objectiveInitialState } from '../entities/objective/reducer';
import { initialState as schemaInitialState } from '../entities/schema/reducer';
import { initialState as timelineInitialState } from '../entities/timeline/reducer';
import { initialState as managersInitialState } from '../entities/managers/reducer';
import { initialState as feedbackInitialState } from '../entities/feedback/reducer';
import { initialState as colleaguessState } from '../entities/colleagues/reducer';

//@ts-ignore
export const initialState = {
  users: userInitialState,
  toasts: toastInitialState,
  objectives: objectiveInitialState,
  schema: schemaInitialState,
  timeline: timelineInitialState,
  managers: managersInitialState,
  feedback: feedbackInitialState,
  colleagues: colleaguessState,
};

export type State = StateType<typeof initialState>;
