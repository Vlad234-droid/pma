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
import { TipsAdministration, CreateTip, EditTip } from './Tips';
import CreatePerformanceCycle from './PerformanceCycle/CreatePerformanceCycle';
import PerformanceCycleAdministration from './PerformanceCycle/PerformanceCycleAdministration';

const pages: Record<
  Page,
  {
    component: PageElement;
    withHeader: boolean;
    title?: string;
  }
> = {
  [Page.MY_TEAM]: {
    component: MyTeam,
    title: 'My Team',
    withHeader: true,
  },
  [Page.ACTIONS]: {
    component: Actions,
    title: 'Actions',
    withHeader: true,
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    component: CreatePerformanceCycle,
    title: 'Create Performance Cycle',
    withHeader: true,
  },
  [Page.PERFORMANCE_CYCLE]: {
    component: PerformanceCycleAdministration,
    title: 'Performance Cycle Administration',
    withHeader: true,
  },
  [Page.CAREER_PERFORMANCE]: {
    component: CareerPerformance,
    title: 'Your Сontribution',
    withHeader: true,
  },
  [Page.CREATE_ORGANIZATION_OBJECTIVES]: {
    component: CreateOrganizationObjectives,
    title: 'Create Organization Objectives',
    withHeader: true,
  },
  [Page.VIEW_ORGANIZATION_OBJECTIVES]: {
    component: ObjectivesView,
    withHeader: false,
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    component: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
  },
  [Page.OBJECTIVES_VIEW]: {
    component: Objectives,
    title: 'My Objectives',
    withHeader: true,
  },
  [Page.PROFILE]: {
    component: Profile,
    title: 'My profile',
    withHeader: true,
  },
  [Page.SETTINGS]: {
    component: Settings,
    title: 'Settings',
    withHeader: true,
  },
  [Page.FEEDBACK]: {
    component: Feedback,
    title: 'Feedback',
    withHeader: true,
  },
  [Page.GIVE_FEEDBACK]: {
    component: GiveFeedback,
    title: 'Give feedback',
    withHeader: true,
  },
  [Page.REQUEST_FEEDBACK]: {
    component: RequestFeedback,
    withHeader: false,
  },
  [Page.RESPOND_FEEDBACK]: {
    component: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
  },
  [Page.VIEW_FEEDBACK]: {
    component: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
  },
};

export default pages;
