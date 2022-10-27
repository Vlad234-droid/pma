import { combineReducers } from 'redux';

import userReducer from '../entities/user/reducer';
import toastReducer from '../entities/toast/reducer';
import orgObjectiveReducer from '../entities/orgObjective/reducer';
import schemaReducer from '../entities/schema/reducer';
import timelineReducer from '../entities/timeline/reducer';
import managersReducer from '../entities/managers/reducer';
import feedbackReducer from '../entities/feedback/reducer';
import colleagueReducer from '../entities/colleague/reducer';
import colleaguesReducer from '../entities/colleagues/reducer';
import reviewsReducer from '../entities/reviews/reducer';
import objectiveSharingReducer from '../entities/objectiveSharing/reducer';
import priorityNotesReducer from '../entities/priorityNotes/reducer';
import notesReducer from '../entities/notes/reducer';
import tipsReducer from '../entities/tips/reducer';
import performanceCycleReducer from '../entities/performanceCycle/reducer';
import configEntriesReducer from '../entities/configEntries/reducer';
import processTemplateReducer from '../entities/processTemplate/reducer';
import pdpReducer from '../entities/pdp/reducer';
import reportReducer from '../entities/report/reducer';
import previousReviewFilesReducer from '../entities/previousReviewFiles/reducer';
import appStateReducer from '../entities/appState/reducer';
import messagesReducer from '../entities/messages/reducer';
import knowledgeLibraryReducer from '../entities/knowledgeLibrary/reducer';
import menuDataReducer from '../entities/hamburgerMenu/reducer';
import statisticsReducer from '../entities/statistics/reducer';
import calibrationSessionsReducer from '../entities/calibrationSessions/reducer';

export const rootReducer = combineReducers({
  users: userReducer,
  toasts: toastReducer,
  orgObjectives: orgObjectiveReducer,
  pdp: pdpReducer,
  schema: schemaReducer,
  timeline: timelineReducer,
  managers: managersReducer,
  feedback: feedbackReducer,
  colleague: colleagueReducer,
  colleagues: colleaguesReducer,
  reviews: reviewsReducer,
  objectivesSharing: objectiveSharingReducer,
  priorityNotes: priorityNotesReducer,
  notes: notesReducer,
  tips: tipsReducer,
  performanceCycle: performanceCycleReducer,
  configEntries: configEntriesReducer,
  processTemplate: processTemplateReducer,
  report: reportReducer,
  previousReviewFiles: previousReviewFilesReducer,
  appState: appStateReducer,
  messages: messagesReducer,
  knowledgeLibrary: knowledgeLibraryReducer,
  menuData: menuDataReducer,
  statistics: statisticsReducer,
  calibrationSessions: calibrationSessionsReducer,
});
