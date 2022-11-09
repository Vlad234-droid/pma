import { StateType } from 'typesafe-actions';
import { initialState as userInitialState } from '../entities/user/reducer';
import { initialState as toastInitialState } from '../entities/toast/reducer';
import { initialState as orgObjectiveInitialState } from 'entities/orgObjective/reducer';
import { initialState as schemaInitialState } from '../entities/schema/reducer';
import { initialState as timelineInitialState } from '../entities/timeline/reducer';
import { initialState as managersInitialState } from '../entities/managers/reducer';
import { initialState as feedbackInitialState } from '../entities/feedback/reducer';
import { initialState as colleagueInitialState } from '../entities/colleague/reducer';
import { initialState as colleaguessState } from '../entities/colleagues/reducer';
import { initialState as reviewsInitialState } from '../entities/reviews/reducer';
import { initialState as objectiveSharingState } from '../entities/objectiveSharing/reducer';
import { initialState as priorityNotesState } from '../entities/priorityNotes/reducer';
import { initialState as notesState } from '../entities/notes/reducer';
import { initialState as tipsInitialState } from '../entities/tips/reducer';
import { initialState as performanceCycleInitialState } from '../entities/performanceCycle/reducer';
import { initialState as configEntriesInitialState } from '../entities/configEntries/reducer';
import { initialState as processTemplateInitialState } from '../entities/processTemplate/reducer';
import { initialState as pdpInitialState } from '../entities/pdp/reducer';
import { initialState as reportInitialState } from '../entities/report/reducer';
import { initialState as previousReviewFilesInitialState } from '../entities/previousReviewFiles/reducer';
import { initialState as appState } from '../entities/appState/reducer';
import { initialState as messagesState } from '../entities/messages/reducer';
import { initialState as knowledgeLibraryState } from '../entities/knowledgeLibrary/reducer';
import { initialState as statisticsState } from '../entities/statistics/reducer';
import { initialState as calibrationSessionsState } from '../entities/calibrationSessions/reducer';
import { initialState as calibrationReviewState } from '../entities/calibrationReview/reducer';
import { State as TimelineState } from 'entities/timeline/types';

//@ts-ignore
export const initialState = {
  users: userInitialState,
  toasts: toastInitialState,
  orgObjectives: orgObjectiveInitialState,
  pdp: pdpInitialState,
  schema: schemaInitialState,
  timeline: timelineInitialState,
  managers: managersInitialState,
  feedback: feedbackInitialState,
  colleague: colleagueInitialState,
  colleagues: colleaguessState,
  reviewsInitialState: reviewsInitialState,
  objectivesSharing: objectiveSharingState,
  priorityNotes: priorityNotesState,
  notes: notesState,
  tips: tipsInitialState,
  performanceCycle: performanceCycleInitialState,
  configEntries: configEntriesInitialState,
  processTemplate: processTemplateInitialState,
  report: reportInitialState,
  previousReviewFiles: previousReviewFilesInitialState,
  appState,
  messages: messagesState,
  knowledgeLibrary: knowledgeLibraryState,
  statistics: statisticsState,
  calibrationSessions: calibrationSessionsState,
  calibrationReview: calibrationReviewState,
};

type InitialStateType = Omit<typeof initialState, 'timeline'>;

export type State = StateType<InitialStateType> & {
  timeline: TimelineState;
};
