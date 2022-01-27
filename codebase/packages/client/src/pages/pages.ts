import { Graphics } from 'components/Icon';
import * as roles from 'features/Permission/constants/roles';

import { Page, PageElement } from './types';
import CareerPerformance from './CareerPerformance';
import { PersonalDevelopmentPlan, CreatePersonalDevelopmentGoal, PersonalDevelopmentHelp } from './PDP';
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
import { EditTip, TipsAdministration } from './Tips';
import { UserObjectives } from './UserObjectives';

type RoleKeys = keyof typeof roles;

export type PageComponent = {
  Element: PageElement;
  withHeader: boolean;
  perform: Array<typeof roles[RoleKeys]>;
  title?: string;
  backPath?: string;
  withIcon?: boolean;
  iconName?: Graphics;
};
const pages: Record<Page, PageComponent> = {
  [Page.MY_TEAM]: {
    Element: MyTeam,
    title: 'My Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [roles.LINE_MANAGER],
  },
  [Page.NOTES]: {
    Element: Notes,
    title: 'My Notes',
    withHeader: true,
    perform: [],
  },
  [Page.MY_ACTIONS]: {
    Element: MyActions,
    title: 'Actions',
    withHeader: true,
    backPath: Page.MY_TEAM,
    perform: [],
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    Element: CreatePerformanceCycle,
    title: 'Create Performance Cycle',
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
    perform: [roles.TALENT_ADMIN, roles.PROCESS_MANAGER, roles.ADMIN],
  },
  [Page.PERFORMANCE_CYCLE]: {
    Element: PerformanceCycleAdministration,
    title: 'Performance Cycle Administration',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [roles.PEOPLE_TEAM, roles.TALENT_ADMIN, roles.PROCESS_MANAGER, roles.ADMIN],
  },
  [Page.CONTRIBUTION]: {
    Element: CareerPerformance,
    title: 'Your Contribution',
    withHeader: true,
    withIcon: true,
    iconName: 'home',
    perform: [],
  },
  [Page.CREATE_STRATEGIC_DRIVERS]: {
    Element: CreateOrganizationObjectives,
    title: 'Create Strategic drivers',
    withHeader: true,
    backPath: Page.OBJECTIVES_VIEW,
    perform: [roles.TALENT_ADMIN],
  },
  [Page.STRATEGIC_DRIVERS]: {
    Element: ObjectivesView,
    withHeader: false,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.TALENT_ADMIN],
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    Element: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.CREATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'Create Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'UPDATE Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.PERSONAL_DEVELOPMENT_HELP]: {
    Element: PersonalDevelopmentHelp,
    title: 'Personal Development Plan help',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.OBJECTIVES_VIEW]: {
    Element: Objectives,
    title: 'My objectives and reviews',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [],
  },
  [Page.USER_OBJECTIVES]: {
    Element: UserObjectives,
    title: 'User Objectives',
    withHeader: true,
    backPath: Page.MY_TEAM,
    perform: [],
  },
  [Page.PROFILE]: {
    Element: Profile,
    title: 'My profile',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [],
  },
  [Page.SETTINGS]: {
    Element: Settings,
    title: 'Settings',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [],
  },
  [Page.GIVE_FEEDBACK]: {
    Element: GiveFeedback,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.GIVE_NEW_FEEDBACK]: {
    Element: GiveNewFeedBack,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.GIVE_FEEDBACK,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.REQUEST_FEEDBACK]: {
    Element: RequestFeedback,
    withHeader: false,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.RESPOND_FEEDBACK]: {
    Element: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.VIEW_FEEDBACK]: {
    Element: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },

  [Page.FEEDBACK]: {
    Element: Feedback,
    title: 'Feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM],
  },
  [Page.TIPS]: {
    Element: TipsAdministration,
    title: 'Tips',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [roles.COLLEAGUE, roles.LINE_MANAGER, roles.PEOPLE_TEAM, roles.ADMIN],
  },
  [Page.EDIT_TIP]: {
    Element: EditTip,
    title: 'Edit Tip',
    withHeader: false,
    backPath: Page.TIPS,
    perform: [roles.TALENT_ADMIN],
  },
  [Page.REPORT]: {
    Element: Report,
    title: 'Team reporting',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [roles.LINE_MANAGER, roles.PEOPLE_TEAM, roles.TALENT_ADMIN],
  },
};

export default pages;
