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
import ObjectivesView from './ObjectivesView';
import { CreatePerformanceCycle, PerformanceCycleAdministration } from './PerformanceCycle';
import UserObjectives from './UserObjectives';

const pages: Record<
  Page,
  {
    component: PageElement;
    withHeader: boolean;
    title?: string;
    backPath?: string;
  }
> = {
  [Page.MY_TEAM]: {
    component: MyTeam,
    title: 'My Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.ACTIONS]: {
    component: Actions,
    title: 'Actions',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    component: CreatePerformanceCycle,
    title: 'Create Performance Cycle',
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
  },
  [Page.PERFORMANCE_CYCLE]: {
    component: PerformanceCycleAdministration,
    title: 'Performance Cycle Administration',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CONTRIBUTION]: {
    component: CareerPerformance,
    title: 'Your Contribution',
    withHeader: true,
  },
  [Page.CREATE_STRATEGIC_DRIVERS]: {
    component: CreateOrganizationObjectives,
    title: 'Create Strategic drivers',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.STRATEGIC_DRIVERS]: {
    component: ObjectivesView,
    withHeader: false,
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    component: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.OBJECTIVES_VIEW]: {
    component: Objectives,
    title: 'My Objectives',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.USER_OBJECTIVES]: {
    component: UserObjectives,
    title: 'User Objectives',
    withHeader: true,
    backPath: Page.MY_TEAM,
  },
  [Page.PROFILE]: {
    component: Profile,
    title: 'My profile',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.SETTINGS]: {
    component: Settings,
    title: 'Settings',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.FEEDBACK]: {
    component: Feedback,
    title: 'Feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.GIVE_FEEDBACK]: {
    component: GiveFeedback,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.REQUEST_FEEDBACK]: {
    component: RequestFeedback,
    withHeader: false,
    backPath: Page.CONTRIBUTION,
  },
  [Page.RESPOND_FEEDBACK]: {
    component: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.VIEW_FEEDBACK]: {
    component: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
};

export default pages;
