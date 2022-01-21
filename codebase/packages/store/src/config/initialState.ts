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
import { initialState as notesState } from '../entities/notes/reducer';
import { initialState as tipsInitialState } from '../entities/tips/reducer';
import { initialState as performanceCycleInitialState } from '../entities/performanceCycle/reducer';
import { initialState as configEntriesInitialState } from '../entities/configEntries/reducer';
import { initialState as processTemplateInitialState } from '../entities/processTemplate/reducer';
import { initialState as pdpInitialState } from '../entities/pdp/reducer';
import { initialState as reportInitialState } from '../entities/report/reducer';

//@ts-ignore
export const initialState = {
  users: userInitialState,
  toasts: toastInitialState,
  objectives: objectiveInitialState,
  orgObjectives: orgObjectiveInitialState,
  pdp: pdpInitialState,
  schema: schemaInitialState,
  timeline: timelineInitialState,
  managers: managersInitialState,
  feedback: feedbackInitialState,
  colleagues: colleaguessState,
  reviewsInitialState: reviewsInitialState,
  objectivesSharing: objectiveSharingState,
  notes: notesState,
  tips: tipsInitialState,
  performanceCycle: performanceCycleInitialState,
  configEntries: configEntriesInitialState,
  processTemplate: processTemplateInitialState,
  report: reportInitialState,
};

export type State = StateType<typeof initialState>;
