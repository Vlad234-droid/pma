import { Graphics } from 'components/Icon';
import { role, tenant, workLevel } from 'features/general/Permission';

import { Page, PageElement } from './types';
import CareerPerformance from './CareerPerformance';
import { CreatePersonalDevelopmentGoal, PersonalDevelopmentHelp, PersonalDevelopmentPlan } from './PDP';
import MyTeam from './MyTeam';
import MyActions from './MyActions';
import Objectives from './Objectives';
import Profile from './Profile';
import Feedback from './Feedback';
import GiveFeedback from './GiveFeedback';
import GiveNewFeedBack from './GiveNewFeedback';
import RequestFeedback from './RequestFeedback';
import RespondFeedback from './RespondFeedback';
import ViewFeedback from './ViewFeedback';
import Settings from './Settings';
import Notes, { NotesInfo, PersonalNote, PersonalNoteFolder, TeamNote, TeamNoteFolder } from './Notes';
import KnowledgeLibrary from './KnowledgeLibrary';
import CreateOrganizationObjectives from './CreateOrganizationObjectives';
import ObjectivesView from './ObjectivesView';
import Report from './Report';
import { CreatePerformanceCycle, PerformanceCycleAdministration } from './PerformanceCycle';
import { EditTip, TipsAdministration } from './Tips';
import UserObjectives from './UserObjectives';
import PeopleTeam from './PeopleTeam';
import Calibration from './Calibration';
import RespondNewFeedback from './RespondNewFeedback';
import TileReportStatistics from './TileReportStatistics';
import CalibrationRatings from './CalibrationRatings';
import PreviousRatingsTiles from './PreviousRatingsTiles';
import PreviousCalibrationRatings from './PreviousCalibrationRatings';
import PreviousObjectiveRatings from './PreviousObjectiveRatings';
import PreviousReviewForms from './PreviousReviewForms';
import { NotFound } from './NotFound';

export type PageComponent = {
  Element: PageElement;
  withHeader: boolean;
  perform: Array<role | workLevel>;
  tenant: Array<tenant>;
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
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.KNOWLEDGE_LIBRARY_BY_ID]: {
    Element: KnowledgeLibrary,
    title: 'Want to learn more?',
    withHeader: true,
    backPath: Page.KNOWLEDGE_LIBRARY,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.MY_TEAM]: {
    Element: MyTeam,
    title: 'My Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PEOPLE_TEAM]: {
    Element: PeopleTeam,
    title: 'People Team',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CALIBRATION]: {
    Element: Calibration,
    title: 'Calibration',
    withHeader: true,
    backPath: Page.REPORT,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.NOTES]: {
    Element: Notes,
    title: 'My Notes',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.NOTES_INFO]: {
    Element: NotesInfo,
    title: 'Notes',
    withHeader: true,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE]: {
    Element: PersonalNote,
    title: 'Notes',
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE_FOLDER]: {
    Element: PersonalNoteFolder,
    title: 'Notes',
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TEAM_NOTE]: {
    Element: TeamNote,
    title: 'Notes',
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TEAM_NOTE_FOLDER]: {
    Element: TeamNoteFolder,
    title: 'Notes',
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.MY_ACTIONS]: {
    Element: MyActions,
    title: 'Actions',
    withHeader: true,
    backPath: Page.MY_TEAM,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERFORMANCE_CYCLE_POPULATION_MATRIX]: {
    Element: () => null,
    title: 'Population matrix',
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
    perform: [role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    Element: CreatePerformanceCycle,
    title: 'Create Performance Cycle',
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
    perform: [role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERFORMANCE_CYCLE]: {
    Element: PerformanceCycleAdministration,
    title: 'Performance Cycle Administration',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.PEOPLE_TEAM, role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CONTRIBUTION]: {
    Element: CareerPerformance,
    title: 'Your Contribution',
    withHeader: true,
    withIcon: true,
    iconName: 'home',
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CREATE_STRATEGIC_DRIVERS]: {
    Element: CreateOrganizationObjectives,
    title: 'Create Strategic drivers',
    withHeader: true,
    backPath: Page.OBJECTIVES_VIEW,
    perform: [role.TALENT_ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.STRATEGIC_DRIVERS]: {
    Element: ObjectivesView,
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.GENERAL],
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    Element: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CREATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'Create Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'UPDATE Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERSONAL_DEVELOPMENT_HELP]: {
    Element: PersonalDevelopmentHelp,
    title: 'Personal Development Plan help',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.OBJECTIVES_VIEW]: {
    Element: Objectives,
    title: 'My objectives and reviews',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.USER_OBJECTIVES]: {
    Element: UserObjectives,
    title: 'Colleague overview',
    withHeader: true,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PROFILE]: {
    Element: Profile,
    title: 'My profile',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.SETTINGS]: {
    Element: Settings,
    title: 'Settings',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.GIVE_FEEDBACK]: {
    Element: GiveFeedback,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.GIVE_NEW_FEEDBACK]: {
    Element: GiveNewFeedBack,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.GIVE_FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.REQUEST_FEEDBACK]: {
    Element: RequestFeedback,
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.RESPOND_FEEDBACK]: {
    Element: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.RESPOND_NEW_FEEDBACK]: {
    Element: RespondNewFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.RESPOND_FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.VIEW_FEEDBACK]: {
    Element: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },

  [Page.FEEDBACK]: {
    Element: Feedback,
    title: 'Feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TIPS]: {
    Element: TipsAdministration,
    title: 'Tips',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.EDIT_TIP]: {
    Element: EditTip,
    title: 'Edit Tip',
    withHeader: false,
    backPath: Page.TIPS,
    perform: [role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.REPORT]: {
    Element: Report,
    title: 'Team reporting',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.TALENT_ADMIN, role.ADMIN, role.LINE_MANAGER, role.EXECUTIVE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TILE_REPORT_STATISTICS]: {
    Element: TileReportStatistics,
    withHeader: true,
    perform: [role.TALENT_ADMIN, role.ADMIN, role.LINE_MANAGER, role.EXECUTIVE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  // TODO: enabled when content of page meets business requirements
  // [Page.ADMINISTRATION]: {
  //   Element: AdministratorPage,
  //   title: 'Administrator page',
  //   withHeader: true,
  //   backPath: Page.CONTRIBUTION,
  //   perform: [role.ADMIN],
  //   tenant: [tenant.BANK, tenant.GENERAL],
  // },
  [Page.CALIBRATION_RATINGS]: {
    Element: CalibrationRatings,
    withHeader: false,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PREVIOUS_RATINGS_TILES]: {
    Element: PreviousRatingsTiles,
    title: 'Previous Ratings',
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PREVIOUS_CALIBRATION_RATINGS]: {
    Element: PreviousCalibrationRatings,
    title: 'Previous Ratings',
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PREVIOUS_OBJECTIVES_RATINGS]: {
    Element: PreviousObjectiveRatings,
    title: 'Objectives',
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PREVIOUS_REVIEW_FORMS]: {
    Element: PreviousReviewForms,
    title: 'Review forms',
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.NOT_FOUND]: {
    Element: NotFound,
    title: 'Not found',
    withHeader: false,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
};

export default pages;
