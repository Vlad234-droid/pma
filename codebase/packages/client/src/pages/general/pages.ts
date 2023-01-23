import { TFunction } from 'components/Translation';
import { Graphics } from 'components/Icon';
import { role, Tenant, workLevel } from 'features/general/Permission';

import { Page, PageElement } from './types';
import CareerPerformance from './CareerPerformance';

import { CreatePersonalDevelopmentGoal, PersonalDevelopmentHelp, PersonalDevelopmentPlan } from './PDP';
import MyTeam from './MyTeam';
import MyActions from './MyActions';
import Reviews from './Reviews';
import Profile from './Profile';
import Feedback, { Feedback360Info } from './Feedback';
import GiveFeedback from './GiveFeedback';
import GiveNewFeedBack from './GiveNewFeedback';
import RequestFeedback from './RequestFeedback';
import RespondFeedback from './RespondFeedback';
import ViewFeedback from './ViewFeedback';
import Settings from './Settings';
import Notes, {
  CreatePersonalNote,
  CreatePersonalNoteFolder,
  CreateTeamNote,
  CreateTeamNoteFolder,
  NotesInfo,
  PersonalNoteView,
  TeamNoteView,
} from './Notes';
import KnowledgeLibrary from './KnowledgeLibrary';
import OrganizationObjectives from './OrganizationObjectives';
import ObjectivesView from './ObjectivesView';
import Report from './Report';
import ReportDownload from './ReportDownload';
import { CreatePerformanceCycle, PerformanceCycleAdministration } from './PerformanceCycle';
import { EditTip, TipsAdministration } from './Tips';
import UserReviews from './UserReviews';
import PeopleTeam from './PeopleTeam';
import CalibrationSessionList, { CreateCalibrationSession } from './CalibrationSessionList';
import CalibrationSessionOverview, { CalibrationSession } from './CalibrationSession';
import RespondNewFeedback from './RespondNewFeedback';
import ReportStatistics from './ReportStatistics';
import PreviousObjectiveRatings from './PreviousObjectiveRatings';
import PreviousReviewForms from './PreviousReviewForms';
import Review from './Review';
import UserReview from './UserReview';
import UpdateObjectives, { CreateObjective } from './CreateUpdateObjectives';
import { NotFound } from './NotFound';
import PriorityNote from './Notes/PriorityNote';
import PriorityNoteEdit from './Notes/PriorityNoteEdit';
import CreateCalibrationRating, { CreateCalibrationSessionRating } from './CreateCalibrationRating';

export type PageComponent = {
  Element: PageElement;
  withHeader: boolean;
  perform: Array<role | workLevel>;
  tenant: Array<Tenant>;
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
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.KNOWLEDGE_LIBRARY_BY_ID]: {
    Element: KnowledgeLibrary,
    title: (_, t) => t('title_knowledge_library'),
    withHeader: true,
    backPath: Page.KNOWLEDGE_LIBRARY,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.MY_TEAM]: {
    Element: MyTeam,
    title: (_, t) => t('my_team'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PEOPLE_TEAM]: {
    Element: PeopleTeam,
    title: (_, t) => t('title_people_team'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.TALENT_ADMIN, role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CALIBRATION_SESSION_OVERVIEW]: {
    Element: CalibrationSessionOverview,
    title: (_, t) => t('calibration'),
    backPath: Page.PEOPLE_TEAM,
    withHeader: true,
    perform: [role.TALENT_ADMIN, role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CALIBRATION_SESSION]: {
    Element: CalibrationSession,
    title: (_, t) => t('calibration'),
    withHeader: true,
    perform: [role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CALIBRATION_SESSION_LIST]: {
    Element: CalibrationSessionList,
    title: (_, t) => t('calibration_session'),
    backPath: Page.CALIBRATION_SESSION_OVERVIEW,
    withHeader: true,
    perform: [role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CREATE_CALIBRATION_SESSION]: {
    Element: CreateCalibrationSession,
    title: (_, t) => t('create_calibration_session'),
    withHeader: true,
    perform: [role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.EDIT_CALIBRATION_SESSION]: {
    Element: CreateCalibrationSession,
    title: (_, t) => t('edit_calibration_session'),
    withHeader: true,
    perform: [role.LINE_MANAGER, role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CREATE_CALIBRATION_RATING]: {
    Element: CreateCalibrationRating,
    withHeader: false,
    perform: [role.LINE_MANAGER, role.PEOPLE_TEAM, role.TALENT_ADMIN],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CREATE_CALIBRATION_SESSION_RATING]: {
    Element: CreateCalibrationSessionRating,
    withHeader: false,
    perform: [role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.NOTES]: {
    Element: Notes,
    title: (_, t) => t('my_notes'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.NOTES_INFO]: {
    Element: NotesInfo,
    title: (_, t) => t('notes'),
    withHeader: true,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE]: {
    Element: PersonalNoteView,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PRIORITY_NOTE]: {
    Element: PriorityNote,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PRIORITY_NOTE_EDIT]: {
    Element: PriorityNoteEdit,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE_CREATE]: {
    Element: CreatePersonalNote,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PERSONAL_NOTE_FOLDER_CREATE]: {
    Element: CreatePersonalNoteFolder,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.TEAM_NOTE]: {
    Element: TeamNoteView,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.TEAM_NOTE_CREATE]: {
    Element: CreateTeamNote,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.TEAM_NOTE_FOLDER_CREATE]: {
    Element: CreateTeamNoteFolder,
    title: (_, t) => t('notes'),
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.MY_TEAM_ACTIONS]: {
    Element: MyActions,
    title: (_, t) => t('actions'),
    withHeader: true,
    backPath: Page.MY_TEAM,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PERFORMANCE_CYCLE_POPULATION_MATRIX]: {
    Element: () => null,
    title: (_, t) => t('population_matrix'),
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
    perform: [role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CREATE_PERFORMANCE_CYCLE]: {
    Element: CreatePerformanceCycle,
    title: (_, t) => t('create_performance_cycle'),
    withHeader: true,
    backPath: Page.PERFORMANCE_CYCLE,
    perform: [role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PERFORMANCE_CYCLE]: {
    Element: PerformanceCycleAdministration,
    title: (_, t) => t('performance_cycle_administration'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.PEOPLE_TEAM, role.TALENT_ADMIN, role.PROCESS_MANAGER, role.ADMIN],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CONTRIBUTION]: {
    Element: CareerPerformance,
    title: (_, t) => t('your_contribution'),
    withHeader: true,
    withIcon: true,
    iconName: 'home',
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CREATE_STRATEGIC_DRIVERS]: {
    Element: OrganizationObjectives,
    title: (_, t) => t('title_create_strategic_drivers'),
    withHeader: true,
    backPath: Page.REVIEWS_VIEW,
    perform: [role.TALENT_ADMIN],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.STRATEGIC_DRIVERS]: {
    Element: ObjectivesView,
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.GENERAL],
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    Element: PersonalDevelopmentPlan,
    title: (tenant, t) => t('personal_development_plan'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CREATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: (_, t) => t('title_create_personal_development_goal'),
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: (_, t) => t('title_update_personal_development_goal'),
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PERSONAL_DEVELOPMENT_HELP]: {
    Element: PersonalDevelopmentHelp,
    title: (_, t) => t('title_personal_development_plan_help'),
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.REVIEWS_VIEW]: {
    Element: Reviews,
    title: (tenant, t) =>
      t('my_objectives_and_reviews', tenant === Tenant.GENERAL ? 'My objectives and reviews' : 'Quarterly priorities', {
        ns: tenant,
      }),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.REVIEWS]: {
    Element: Review,
    withHeader: true,
    backPath: Page.REVIEWS_VIEW,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.EDIT_OBJECTIVES]: {
    Element: UpdateObjectives,
    withHeader: true,
    backPath: Page.REVIEWS_VIEW,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.EDIT_OBJECTIVE]: {
    Element: UpdateObjectives,
    withHeader: true,
    backPath: Page.REVIEWS_VIEW,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.CREATE_OBJECTIVES]: {
    Element: CreateObjective,
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.USER_REVIEWS]: {
    Element: UserReviews,
    title: (_, t) => t('title_colleague_overview'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.LINE_MANAGER],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.USER_TL_REVIEW]: {
    Element: UserReview,
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PROFILE]: {
    Element: Profile,
    title: (_, t) => t('title_my_profile'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.SETTINGS]: {
    Element: Settings,
    title: (_, t) => t('title_settings'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.GIVE_FEEDBACK]: {
    Element: GiveFeedback,
    title: (_, t) => t('give_feedback'),
    withHeader: true,
    backPath: Page.FEEDBACKS,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.GIVE_NEW_FEEDBACK]: {
    Element: GiveNewFeedBack,
    title: (_, t) => t('give_feedback'),
    withHeader: true,
    backPath: Page.GIVE_FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.REQUEST_FEEDBACK]: {
    Element: RequestFeedback,
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.RESPOND_FEEDBACK]: {
    Element: RespondFeedback,
    title: (_, t) => t('respond_to_feedback_requests'),
    withHeader: true,
    backPath: Page.FEEDBACKS,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.RESPOND_NEW_FEEDBACK]: {
    Element: RespondNewFeedback,
    title: (_, t) => t('respond_to_feedback_requests'),
    withHeader: true,
    backPath: Page.RESPOND_FEEDBACK,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.VIEW_FEEDBACK]: {
    Element: ViewFeedback,
    title: (_, t) => t('title_view_feedback'),
    withHeader: true,
    backPath: Page.FEEDBACKS,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },

  [Page.FEEDBACKS]: {
    Element: Feedback,
    title: (_, t) => t('feedback'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.FEEDBACK_360_INFO]: {
    Element: Feedback360Info,
    withHeader: false,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.TIPS]: {
    Element: TipsAdministration,
    title: (_, t) => t('title_tips'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.ADMIN],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.EDIT_TIP]: {
    Element: EditTip,
    title: (_, t) => t('edit_tip'),
    withHeader: false,
    backPath: Page.TIPS,
    perform: [role.ADMIN],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.REPORT]: {
    Element: Report,
    title: (_, t) => t('team_reporting'),
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.TALENT_ADMIN, role.ADMIN, role.LINE_MANAGER, role.EXECUTIVE, role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.REPORT_DOWNLOAD]: {
    Element: ReportDownload,
    withHeader: false,
    perform: [role.TALENT_ADMIN, role.ADMIN, role.LINE_MANAGER, role.EXECUTIVE, role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.REPORT_STATISTICS]: {
    Element: ReportStatistics,
    withHeader: true,
    perform: [role.TALENT_ADMIN, role.ADMIN, role.LINE_MANAGER, role.EXECUTIVE, role.PEOPLE_TEAM],
    tenant: [Tenant.BANK, Tenant.GENERAL],
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
  [Page.PREVIOUS_OBJECTIVES_RATINGS]: {
    Element: PreviousObjectiveRatings,
    title: (_, t) => t('objectives'),
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.PREVIOUS_REVIEW_FORMS]: {
    Element: PreviousReviewForms,
    title: (_, t) => t('review_forms'),
    withHeader: true,
    perform: [role.LINE_MANAGER],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
  [Page.NOT_FOUND]: {
    Element: NotFound,
    title: (_, t) => t('title_not_found'),
    withHeader: false,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
    tenant: [Tenant.BANK, Tenant.GENERAL],
  },
};

export default pages;
