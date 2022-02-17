import { Graphics } from 'components/Icon';
import { role } from 'features/Permission';

import { Page, PageElement } from './types';
import CareerPerformance from './CareerPerformance';
import { CreatePersonalDevelopmentGoal, PersonalDevelopmentHelp, PersonalDevelopmentPlan } from './PDP';
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
import KnowledgeLibrary from './KnowledgeLibrary';
import CreateOrganizationObjectives from './CreateOrganizationObjectives';
import ObjectivesView from './ObjectivesView';
import Report from './Report';
import { CreatePerformanceCycle, PerformanceCycleAdministration } from './PerformanceCycle';
import { EditTip, TipsAdministration } from './Tips';
import { UserObjectives } from './UserObjectives';
import PeopleTeam from './PeopleTeam';
import Calibration from './Calibration';
import AdministratorPage from './AdministratorPage';

export type PageComponent = {
  Element: PageElement;
  withHeader: boolean;
  perform: Array<role>;
  title?: string;
  backPath?: string;
  withIcon?: boolean;
  iconName?: Graphics;
};
const pages: Record<Page, PageComponent> = {
  [Page.KNOWLEDGE_LIBRARY]: {
    Element: KnowledgeLibrary,
    title: 'Want to learn more?',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [],
  },
  [Page.KNOWLEDGE_LIBRARY_BY_ID]: {
    Element: KnowledgeLibrary,
    title: 'Want to learn more?',
    withHeader: true,
    backPath: Page.KNOWLEDGE_LIBRARY,
    perform: [],
  },
  [Page.MY_TEAM]: {
    Element: MyTeam,
    title: 'My Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
  },
  [Page.PEOPLE_TEAM]: {
    Element: PeopleTeam,
    title: 'People Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
  },
  [Page.CALIBRATION]: {
    Element: Calibration,
    title: 'Calibration',
    withHeader: true,
    backPath: Page.PEOPLE_TEAM,
    perform: [role.LINE_MANAGER],
  },
  [Page.NOTES]: {
    Element: Notes,
    title: 'My Notes',
    withHeader: true,
    perform: [role.COLLEAGUE],
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
    perform: [role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
  },
  [Page.PERFORMANCE_CYCLE]: {
    Element: PerformanceCycleAdministration,
    title: 'Performance Cycle Administration',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.PEOPLE_TEAM, role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
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
    perform: [role.TALENT_ADMIN],
  },
  [Page.STRATEGIC_DRIVERS]: {
    Element: ObjectivesView,
    withHeader: false,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.TALENT_ADMIN],
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    Element: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.CREATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'Create Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'UPDATE Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.PERSONAL_DEVELOPMENT_HELP]: {
    Element: PersonalDevelopmentHelp,
    title: 'Personal Development Plan help',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
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
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.GIVE_NEW_FEEDBACK]: {
    Element: GiveNewFeedBack,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.GIVE_FEEDBACK,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.REQUEST_FEEDBACK]: {
    Element: RequestFeedback,
    withHeader: false,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.RESPOND_FEEDBACK]: {
    Element: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.VIEW_FEEDBACK]: {
    Element: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },

  [Page.FEEDBACK]: {
    Element: Feedback,
    title: 'Feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE, role.LINE_MANAGER, role.PEOPLE_TEAM],
  },
  [Page.TIPS]: {
    Element: TipsAdministration,
    title: 'Tips',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.ADMIN],
  },
  [Page.EDIT_TIP]: {
    Element: EditTip,
    title: 'Edit Tip',
    withHeader: false,
    backPath: Page.TIPS,
    perform: [role.ADMIN],
  },
  [Page.REPORT]: {
    Element: Report,
    title: 'Team reporting',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.PEOPLE_TEAM, role.TALENT_ADMIN, role.ADMIN],
  },
  [Page.ADMINISTRATION]: {
    Element: AdministratorPage,
    title: 'Administrator page',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.TALENT_ADMIN, role.ADMIN],
  },
};

export default pages;
