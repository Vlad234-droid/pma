import { TFunction } from 'components/Translation';
import { Graphics } from 'components/Icon';
import { role, tenant, workLevel } from 'features/general/Permission';

import { Page, PageElement } from './types';
import CareerPerformance from './CareerPerformance';
import { CreatePersonalDevelopmentGoal, PersonalDevelopmentHelp, PersonalDevelopmentPlan } from './PDP';
import MyTeam from './MyTeam';
import MyActions from './MyActions';
import Objectives, { CreateObjective } from './Objectives';
import Profile from './Profile';
import Feedback from './Feedback';
import GiveFeedback from './GiveFeedback';
import GiveNewFeedBack from './GiveNewFeedback';
import RequestFeedback from './RequestFeedback';
import RespondFeedback from './RespondFeedback';
import ViewFeedback from './ViewFeedback';
import Settings from './Settings';
import Notes, {
  NotesInfo,
  CreatePersonalNote,
  CreatePersonalNoteFolder,
  CreateTeamNote,
  CreateTeamNoteFolder,
  PersonalNoteView,
  TeamNoteView,
} from './Notes';
import KnowledgeLibrary from './KnowledgeLibrary';
import OrganizationObjectives from './OrganizationObjectives';
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
import { Tenant } from 'utils';

export type PageComponent = {
  Element: PageElement;
  withHeader: boolean;
  perform: Array<role | workLevel>;
  tenant: Array<tenant>;
  title?: (tenant: Tenant, t: TFunction) => string;
  backPath?: string;
  withIcon?: boolean;
  iconName?: Graphics;
};

const pages: Record<Page, PageComponent> = {
  [Page.KNOWLEDGE_LIBRARY]: {
    Element: KnowledgeLibrary,
    title: (tenant, t) => t('title_knowledge_library'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.KNOWLEDGE_LIBRARY_BY_ID]: {
    Element: KnowledgeLibrary,
    title: (tenant, t) => t('title_knowledge_library'),
    withHeader: true,
    backPath: Page.KNOWLEDGE_LIBRARY,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.MY_TEAM]: {
    Element: MyTeam,
    title: (tenant, t) => t('my_team'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PEOPLE_TEAM]: {
    Element: PeopleTeam,
    title: (tenant, t) => t('title_people_team'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CALIBRATION]: {
    Element: Calibration,
    title: (tenant, t) => t('calibration'),
    withHeader: true,
    backPath: Page.REPORT,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.NOTES]: {
    Element: Notes,
    title: (tenant, t) => t('my_notes'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.NOTES_INFO]: {
    Element: NotesInfo,
    title: (tenant, t) => t('notes'),
    withHeader: true,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE]: {
    Element: PersonalNoteView,
    title: (tenant, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE_CREATE]: {
    Element: CreatePersonalNote,
    title: (tenant, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE_FOLDER_CREATE]: {
    Element: CreatePersonalNoteFolder,
    title: (tenant, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TEAM_NOTE]: {
    Element: TeamNoteView,
    title: (tenant, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TEAM_NOTE_CREATE]: {
    Element: CreateTeamNote,
    title: (tenant, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TEAM_NOTE_FOLDER_CREATE]: {
    Element: CreateTeamNoteFolder,
    title: (tenant, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.MY_ACTIONS]: {
    Element: MyActions,
    title: (tenant, t) => t('actions'),
    withHeader: true,
    backPath: Page.MY_TEAM,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERFORMANCE_CYCLE_POPULATION_MATRIX]: {
    Element: () => null,
    title: (tenant, t) => t('population_matrix'),
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
    perform: [role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    Element: CreatePerformanceCycle,
    title: (tenant, t) => t('create_performance_cycle'),
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
    perform: [role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERFORMANCE_CYCLE]: {
    Element: PerformanceCycleAdministration,
    title: (tenant, t) => t('performance_cycle_administration'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.PEOPLE_TEAM, role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CONTRIBUTION]: {
    Element: CareerPerformance,
    title: (tenant, t) => t('people_team'),
    withHeader: true,
    withIcon: true,
    iconName: 'home',
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CREATE_STRATEGIC_DRIVERS]: {
    Element: OrganizationObjectives,
    title: (tenant, t) => t('title_create_strategic_drivers'),
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
    title: (tenant, t) => t('personal_development_plan'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CREATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: (tenant, t) => t('title_create_personal_development_goal'),
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: (tenant, t) => t('title_update_personal_development_goal'),
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PERSONAL_DEVELOPMENT_HELP]: {
    Element: PersonalDevelopmentHelp,
    title: (tenant, t) => t('title_personal_development_plan_help'),
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.OBJECTIVES_VIEW]: {
    Element: Objectives,
    title: (tenant, t) => t('my_objectives_and_reviews', 'My objectives and reviews', { ns: tenant }),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.CREATE_OBJECTIVES]: {
    Element: CreateObjective,
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.USER_OBJECTIVES]: {
    Element: UserObjectives,
    title: (tenant, t) => t('title_colleague_overview'),
    withHeader: true,
    perform: [role.COLLEAGUE],
    backPath: Page.MY_TEAM,
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PROFILE]: {
    Element: Profile,
    title: (tenant, t) => t('title_my_profile'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.SETTINGS]: {
    Element: Settings,
    title: (tenant, t) => t('title_settings'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.GIVE_FEEDBACK]: {
    Element: GiveFeedback,
    title: (tenant, t) => t('give_feedback'),
    withHeader: true,
    backPath: Page.FEEDBACKS,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.GIVE_NEW_FEEDBACK]: {
    Element: GiveNewFeedBack,
    title: (tenant, t) => t('give_feedback'),
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
    title: (tenant, t) => t('respond_to_feedback_requests'),
    withHeader: true,
    backPath: Page.FEEDBACKS,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.RESPOND_NEW_FEEDBACK]: {
    Element: RespondNewFeedback,
    title: (tenant, t) => t('respond_to_feedback_requests'),
    withHeader: true,
    backPath: Page.RESPOND_FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.VIEW_FEEDBACK]: {
    Element: ViewFeedback,
    title: (tenant, t) => t('title_view_feedback'),
    withHeader: true,
    backPath: Page.FEEDBACKS,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },

  [Page.FEEDBACKS]: {
    Element: Feedback,
    title: (tenant, t) => t('feedback'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.TIPS]: {
    Element: TipsAdministration,
    title: (tenant, t) => t('title_tips'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.EDIT_TIP]: {
    Element: EditTip,
    title: (tenant, t) => t('edit_tip'),
    withHeader: false,
    backPath: Page.TIPS,
    perform: [role.ADMIN],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.REPORT]: {
    Element: Report,
    title: (tenant, t) => t('team_reporting'),
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
    title: (tenant, t) => t('title_previous_ratings'),
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PREVIOUS_CALIBRATION_RATINGS]: {
    Element: PreviousCalibrationRatings,
    title: (tenant, t) => t('title_previous_ratings'),
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PREVIOUS_OBJECTIVES_RATINGS]: {
    Element: PreviousObjectiveRatings,
    title: (tenant, t) => t('objectives'),
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.PREVIOUS_REVIEW_FORMS]: {
    Element: PreviousReviewForms,
    title: (tenant, t) => t('review_forms'),
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
  [Page.NOT_FOUND]: {
    Element: NotFound,
    title: (tenant, t) => t('title_not_found'),
    withHeader: false,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [tenant.BANK, tenant.GENERAL],
  },
};

export default pages;
