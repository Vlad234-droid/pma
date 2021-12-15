import { Page, PageElement } from './types';

import CareerPerformance from './CareerPerformance';
import PersonalDevelopmentPlan from './PersonalDevelopmentPlan';
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
import CreateOrganizationObjectives from './CreateOrganizationObjectives';
import ObjectivesView from './ObjectivesView/ObjectivesView';
import { TipsAdministration, TipsForm } from './Tips';
import CreatePerformanceCycle from './PerformanceCycle/CreatePerformanceCycle';
import PerformanceCycleAdministration from './PerformanceCycle/PerformanceCycleAdministration';

const pages: Record<Page, PageElement> = {
  [Page.MY_TEAM]: MyTeam,
  [Page.ACTIONS]: Actions,
  [Page.CREATE_PERFORMANCE_CYCLE]: CreatePerformanceCycle,
  [Page.PERFORMANCE_CYCLE]: PerformanceCycleAdministration,
  [Page.CAREER_PERFORMANCE]: CareerPerformance,
  [Page.CREATE_ORGANIZATION_OBJECTIVES]: CreateOrganizationObjectives,
  [Page.VIEW_ORGANIZATION_OBJECTIVES]: ObjectivesView,
  [Page.PERSONAL_DEVELOPMENT_PLAN]: PersonalDevelopmentPlan,
  [Page.OBJECTIVES_VIEW]: Objectives,
  [Page.PROFILE]: Profile,
  [Page.SETTINGS]: Settings,
  [Page.FEEDBACK]: Feedback,
  [Page.GIVE_FEEDBACK]: GiveFeedback,
  [Page.REQUEST_FEEDBACK]: RequestFeedback,
  [Page.RESPOND_FEEDBACK]: RespondFeedback,
  [Page.VIEW_FEEDBACK]: ViewFeedback,
  [Page.TIPS]: TipsAdministration,
  [Page.CREATE_TIP]: TipsForm,
};

export default pages;
