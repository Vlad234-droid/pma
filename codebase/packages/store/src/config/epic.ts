import { combineEpics } from 'redux-observable';
import userEpic from '../entities/user/epic';
import orgObjectiveEpic from '../entities/orgObjective/epic';
import schemaEpic from '../entities/schema/epic';
import timelineEpic from '../entities/timeline/epic';
import managersEpic from '../entities/managers/epic';
import feedBackEpic from '../entities/feedback/epic';
import colleagueEpic from '../entities/colleague/epic';
import colleaguesEpic from '../entities/colleagues/epic';
import reviewsEpic from '../entities/reviews/epic';
import objectiveSharingEpic from '../entities/objectiveSharing/epic';
import priorityNotesEpic from '../entities/priorityNotes/epic';
import notesEpic from '../entities/notes/epic';
import tipsEpic from '../entities/tips/epic';
import performanceCycleEpic from '../entities/performanceCycle/epic';
import configEntriesEpic from '../entities/configEntries/epic';
import processTemplateEpic from '../entities/processTemplate/epic';
import pdpEpic from '../entities/pdp/epic';
import reportEpic from '../entities/report/epic';
import previousReviewFilesEpic from '../entities/previousReviewFiles/epic';
import messagesEpic from '../entities/messages/epic';
import knowledgeLibraryEpic from '../entities/knowledgeLibrary/epic';
import menuEpic from '../entities/hamburgerMenu/epic';
import statisticsEpic from '../entities/statistics/epic';
import calibrationSessionsEpic from '../entities/calibrationSessions/epic';
import calibrationReviewEpic from '../entities/calibrationReview/epic';
import colleagueFilter from '../entities/colleagueFilter/epic';
import colleagueSimple from '../entities/colleagueSimple/epic';
import completedReviewsEpic from '../entities/completedReviews/epic';
import calibrationUsersReviewsEpic from '../entities/calibrationReviews/epic';

export const rootEpic = combineEpics(
  userEpic,
  schemaEpic,
  orgObjectiveEpic,
  timelineEpic,
  managersEpic,
  feedBackEpic,
  colleagueEpic,
  colleaguesEpic,
  reviewsEpic,
  objectiveSharingEpic,
  priorityNotesEpic,
  notesEpic,
  tipsEpic,
  performanceCycleEpic,
  configEntriesEpic,
  processTemplateEpic,
  pdpEpic,
  reportEpic,
  previousReviewFilesEpic,
  messagesEpic,
  knowledgeLibraryEpic,
  menuEpic,
  statisticsEpic,
  calibrationSessionsEpic,
  calibrationReviewEpic,
  colleagueFilter,
  colleagueSimple,
  completedReviewsEpic,
  calibrationUsersReviewsEpic,
);
