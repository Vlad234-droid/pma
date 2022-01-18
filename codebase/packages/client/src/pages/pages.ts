import { Page, PageElement } from './types';

import CareerPerformance from './CareerPerformance';
import PersonalDevelopmentPlan from './PersonalDevelopmentPlan';
import MyTeam from './MyTeam';
import MyActions from './MyActions';
import Objectives from './Objectives';
import Profile from './Profile';
import Feedback from './Feedback';
import GiveFeedback from './GiveFeedback';
import GiveNewFeedBack from './GiveNewFeedBack';
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
import PeopleTeam from './PeopleTeam';
import Calibration from './Calibration';

export type PageComponent = {
  Element: PageElement;
  withHeader: boolean;
  title?: string;
  backPath?: string;
};
const pages: Record<Page, PageComponent> = {
  [Page.MY_TEAM]: {
    Element: MyTeam,
    title: 'My Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.PEOPLE_TEAM]: {
    Element: PeopleTeam,
    title: 'People Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CALIBRATION]: {
    Element: Calibration,
    title: 'Calibration',
    withHeader: true,
    backPath: Page.PEOPLE_TEAM,
  },
  [Page.NOTES]: {
    Element: Notes,
    title: 'My Notes',
    withHeader: true,
  },
  [Page.MY_ACTIONS]: {
    Element: MyActions,
    title: 'Actions',
    withHeader: true,
    backPath: Page.MY_TEAM,
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    Element: CreatePerformanceCycle,
    title: 'Create Performance Cycle',
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
  },
  [Page.PERFORMANCE_CYCLE]: {
    Element: PerformanceCycleAdministration,
    title: 'Performance Cycle Administration',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CONTRIBUTION]: {
    Element: CareerPerformance,
    title: 'Your Contribution',
    withHeader: true,
  },
  [Page.CREATE_STRATEGIC_DRIVERS]: {
    Element: CreateOrganizationObjectives,
    title: 'Create Strategic drivers',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.STRATEGIC_DRIVERS]: {
    Element: ObjectivesView,
    withHeader: false,
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    Element: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.OBJECTIVES_VIEW]: {
    Element: Objectives,
    title: 'My objectives and reviews',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.USER_OBJECTIVES]: {
    Element: UserObjectives,
    title: 'User Objectives',
    withHeader: true,
    backPath: Page.MY_TEAM,
  },
  [Page.PROFILE]: {
    Element: Profile,
    title: 'My profile',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.SETTINGS]: {
    Element: Settings,
    title: 'Settings',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.GIVE_FEEDBACK]: {
    Element: GiveFeedback,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
  },
  [Page.GIVE_NEW_FEEDBACK]: {
    Element: GiveNewFeedBack,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.GIVE_FEEDBACK,
  },
  [Page.REQUEST_FEEDBACK]: {
    Element: RequestFeedback,
    withHeader: false,
  },
  [Page.RESPOND_FEEDBACK]: {
    Element: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.FEEDBACK,
  },
  [Page.VIEW_FEEDBACK]: {
    Element: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
  },

  [Page.FEEDBACK]: {
    Element: Feedback,
    title: 'Feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.TIPS]: {
    Element: TipsAdministration,
    title: 'Tips',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
  [Page.CREATE_TIP]: {
    Element: CreateTip,
    title: 'Create Tip',
    withHeader: false,
    backPath: Page.TIPS,
  },
  [Page.EDIT_TIP]: {
    Element: EditTip,
    title: 'Edit Tip',
    withHeader: false,
    backPath: Page.TIPS,
  },
  [Page.REPORT]: {
    Element: Report,
    title: 'Team reporting',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
  },
};

export default pages;
