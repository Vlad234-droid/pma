import { Page, PageElement } from './types';

import CareerPerformance from './CareerPerformance';
import MyTeam from './MyTeam';
import Actions from './Actions';
import Objectives from './Objectives';
import Profile from './Profile';
import Feedback from './Feedback';
import GiveFeedback from './GiveFeedback';
import RequestFeedback from './RequestFeedback';
import RespondFeedback from './RespondFeedback';
import ViewFeedback from './ViewFeedback';
import Settings from './Settings';

const pages: Record<Page, PageElement> = {
  [Page.MY_TEAM]: MyTeam,
  [Page.ACTIONS]: Actions,
  [Page.CREATE_PERFORMANCE_CYCLE]: () => null,
  [Page.PERFORMANCE_CYCLE]: () => null,
  [Page.CAREER_PERFORMANCE]: CareerPerformance,
  [Page.OBJECTIVES_VIEW]: Objectives,
  [Page.PROFILE]: Profile,
  [Page.SETTINGS]: Settings,
  [Page.FEEDBACK]: Feedback,
  [Page.GIVE_FEEDBACK]: GiveFeedback,
  [Page.REQUEST_FEEDBACK]: RequestFeedback,
  [Page.RESPOND_FEEDBACK]: RespondFeedback,
  [Page.VIEW_FEEDBACK]: ViewFeedback,
};

export default pages;
