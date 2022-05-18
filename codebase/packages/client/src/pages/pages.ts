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
import GiveNewFeedBack from './GiveNewFeedback';
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
import RespondNewFeedback from './RespondNewFeedback';
import TileReportStatistics from './TileReportStatistics';
import CalibrationRatings from './CalibrationRatings';
import PreviousRatingsTiles from './PreviousRatingsTiles';
import PreviousCalibrationRatings from './PreviousCalibrationRatings';
import PreviousObjectiveRatings from './PreviousObjectiveRatings';
import PreviousReviewForms from './PreviousReviewForms';
import SupportingYourPerformance from './SupportingYourPerformance';
import { NotFound } from './NotFound';

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
    perform: [role.COLLEAGUE],
  },
  [Page.KNOWLEDGE_LIBRARY_BY_ID]: {
    Element: KnowledgeLibrary,
    title: 'Want to learn more?',
    withHeader: true,
    backPath: Page.KNOWLEDGE_LIBRARY,
    perform: [role.COLLEAGUE],
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
    backPath: Page.REPORT,
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
    perform: [role.COLLEAGUE],
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
    perform: [role.COLLEAGUE],
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
    perform: [role.LINE_MANAGER, role.TALENT_ADMIN],
  },
  [Page.PERSONAL_DEVELOPMENT_PLAN]: {
    Element: PersonalDevelopmentPlan,
    title: 'Personal Development Plan',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
  },
  [Page.CREATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'Create Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
  },
  [Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN]: {
    Element: CreatePersonalDevelopmentGoal,
    title: 'UPDATE Personal Development Goal',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
  },
  [Page.PERSONAL_DEVELOPMENT_HELP]: {
    Element: PersonalDevelopmentHelp,
    title: 'Personal Development Plan help',
    withHeader: false,
    backPath: Page.PERSONAL_DEVELOPMENT_PLAN,
    perform: [role.COLLEAGUE],
  },
  [Page.OBJECTIVES_VIEW]: {
    Element: Objectives,
    title: 'My objectives and reviews',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
  },
  [Page.USER_OBJECTIVES]: {
    Element: UserObjectives,
    title: 'Colleague overview',
    withHeader: true,
    perform: [role.COLLEAGUE],
  },
  [Page.PROFILE]: {
    Element: Profile,
    title: 'My profile',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
  },
  [Page.SETTINGS]: {
    Element: Settings,
    title: 'Settings',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
  },
  [Page.GIVE_FEEDBACK]: {
    Element: GiveFeedback,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE],
  },
  [Page.GIVE_NEW_FEEDBACK]: {
    Element: GiveNewFeedBack,
    title: 'Give feedback',
    withHeader: true,
    backPath: Page.GIVE_FEEDBACK,
    perform: [role.COLLEAGUE],
  },
  [Page.REQUEST_FEEDBACK]: {
    Element: RequestFeedback,
    withHeader: false,
    perform: [role.COLLEAGUE],
  },
  [Page.RESPOND_FEEDBACK]: {
    Element: RespondFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE],
  },
  [Page.RESPOND_NEW_FEEDBACK]: {
    Element: RespondNewFeedback,
    title: 'Respond to feedback requests',
    withHeader: true,
    backPath: Page.RESPOND_FEEDBACK,
    perform: [role.COLLEAGUE],
  },
  [Page.VIEW_FEEDBACK]: {
    Element: ViewFeedback,
    title: 'View feedback',
    withHeader: true,
    backPath: Page.FEEDBACK,
    perform: [role.COLLEAGUE],
  },

  [Page.FEEDBACK]: {
    Element: Feedback,
    title: 'Feedback',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
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
    perform: [role.TALENT_ADMIN, role.ADMIN, role.LINE_MANAGER, role.EXECUTIVE],
  },
  [Page.TILE_REPORT_STATISTICS]: {
    Element: TileReportStatistics,
    withHeader: true,
    perform: [role.TALENT_ADMIN, role.ADMIN, role.LINE_MANAGER, role.EXECUTIVE],
  },
  [Page.ADMINISTRATION]: {
    Element: AdministratorPage,
    title: 'Administrator page',
    withHeader: true,
    backPath: Page.CONTRIBUTION,
    perform: [role.ADMIN],
  },
  [Page.CALIBRATION_RATINGS]: {
    Element: CalibrationRatings,
    withHeader: false,
    perform: [role.LINE_MANAGER],
  },
  [Page.PREVIOUS_RATINGS_TILES]: {
    Element: PreviousRatingsTiles,
    title: 'Previous Ratings',
    withHeader: true,
    perform: [role.LINE_MANAGER],
  },
  [Page.PREVIOUS_CALIBRATION_RATINGS]: {
    Element: PreviousCalibrationRatings,
    title: 'Previous Ratings',
    withHeader: true,
    perform: [role.LINE_MANAGER],
  },
  [Page.PREVIOUS_OBJECTIVES_RATINGS]: {
    Element: PreviousObjectiveRatings,
    title: 'Objectives',
    withHeader: true,
    perform: [role.LINE_MANAGER],
  },
  [Page.PREVIOUS_REVIEW_FORMS]: {
    Element: PreviousReviewForms,
    title: 'Review forms',
    withHeader: true,
    perform: [role.LINE_MANAGER],
  },
  [Page.SUPPORTING_YOUR_PERFORMANCE]: {
    Element: SupportingYourPerformance,
    title: 'Supporting Your Performance',
    withHeader: true,
    perform: [role.LINE_MANAGER],
  },
  [Page.NOT_FOUND]: {
    Element: NotFound,
    title: 'Not found',
    withHeader: false,
    backPath: Page.CONTRIBUTION,
    perform: [role.COLLEAGUE],
  },
};

export default pages;
