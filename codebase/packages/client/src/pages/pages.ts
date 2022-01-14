import { Page, PageElement } from './types';

import CareerPerformance from './CareerPerformance';
import { PersonalDevelopmentPlan, CreatePersonalDevelopmentGoal, PersonalDevelopmentHelp } from './PDP';
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
import Notes from './Notes';
import CreateOrganizationObjectives from './CreateOrganizationObjectives';
import ObjectivesView from './ObjectivesView';
import Report from './Report';
import { CreatePerformanceCycle, PerformanceCycleAdministration } from './PerformanceCycle';
import { CreateTip, EditTip, TipsAdministration } from './Tips';
import { UserObjectives } from './UserObjectives';

export type PageComponent = {
  element: PageElement;
  withHeader: boolean;
  title?: string;
  backPath?: string;
};
const pages: Record<Page, PageComponent> = {
  [Page.MY_TEAM]: {
    element: MyTeam,
    title: 'My Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.NOTES]: {
    element: Notes,
    title: 'My Notes',
    withHeader: true,
  },
  [Page.ACTIONS]: {
    element: Actions,
    title: 'Actions',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    element: CreatePerformanceCycle,
    title: 'Create Performance Cycle',
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
  },
  [Page.PERFORMANCE_CYCLE]: {
    element: PerformanceCycleAdministration,
    title: 'Performance Cycle Administration',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CONTRIBUTION]: {
    element: CareerPerformance,
    title: 'Your Contribution',
    withHeader: true,
  },
  [Page.CREATE_STRATEGIC_DRIVERS]: {
    element: CreateOrganizationObjectives,
    title: 'Create Strategic drivers',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.STRATEGIC_DRIVERS]: {
    element: ObjectivesView,
    withHeader: false,
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    element: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CREATE_PERSONAL_DEVELOPMENT_GOAL]: {
    element: CreatePersonalDevelopmentGoal,
    title: 'Create Personal Development Goal',
    withHeader: false,
    backPath: Page.CONTRIBUTION,
  },
  [Page.PERSONAL_DEVELOPMENT_HELP]: {
    element: PersonalDevelopmentHelp,
    title: 'Personal Development Plan help',
    withHeader: false,
    backPath: Page.CONTRIBUTION,
  },
  [Page.OBJECTIVES_VIEW]: {
    element: Objectives,
    title: 'My objectives and reviews',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.USER_OBJECTIVES]: {
    element: UserObjectives,
    title: 'User Objectives',
    withHeader: true,
    backPath: Page.MY_TEAM,
  },
  [Page.PROFILE]: {
    element: Profile,
    title: 'My profile',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.SETTINGS]: {
    element: Settings,
    title: 'Settings',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.GIVE_FEEDBACK]: {
    element: GiveFeedback,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
  },
  [Page.REQUEST_FEEDBACK]: {
    element: RequestFeedback,
    withHeader: false,
  },
  [Page.RESPOND_FEEDBACK]: {
    element: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.FEEDBACK,
  },
  [Page.VIEW_FEEDBACK]: {
    element: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
  },

  [Page.FEEDBACK]: {
    element: Feedback,
    title: 'Feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.TIPS]: {
    element: TipsAdministration,
    title: 'Tips',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CREATE_TIP]: {
    element: CreateTip,
    title: 'Create Tip',
    withHeader: false,
    backPath: Page.TIPS,
  },
  [Page.EDIT_TIP]: {
    element: EditTip,
    title: 'Edit Tip',
    withHeader: false,
    backPath: Page.TIPS,
  },
  [Page.REPORT]: {
    element: Report,
    title: 'Team reporting',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
};

export default pages;
