import { ComponentType, FC, LazyExoticComponent } from 'react';

enum Page {
  CONTRIBUTION = 'contribution',
  CREATE_STRATEGIC_DRIVERS = 'strategic-drivers/new',
  STRATEGIC_DRIVERS = 'strategic-drivers',
  PERFORMANCE_CYCLE_POPULATION_MATRIX = 'performance-cycle/population-matrix',
  CREATE_PERFORMANCE_CYCLE = 'performance-cycle/:performanceCycleUuid',
  PERFORMANCE_CYCLE = 'performance-cycle',
  PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan',
  CREATE_PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan/new',
  UPDATE_PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan/:uuid',
  PERSONAL_DEVELOPMENT_HELP = 'personal-development-plan/help',
  REVIEWS_VIEW = 'reviews',
  EDIT_OBJECTIVES = 'reviews/objectives/edit',
  CREATE_OBJECTIVES = 'reviews/objectives/new',
  EDIT_OBJECTIVE = 'reviews/objectives/:id',
  REVIEWS = 'reviews/:type',
  USER_REVIEWS = 'users/:uuid/reviews',
  USER_TL_REVIEW = 'users/:uuid/reviews/:type',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  MY_TEAM = 'my-team',
  MY_TEAM_ACTIONS = 'my-team/actions',
  KNOWLEDGE_LIBRARY = 'knowledge-library',
  KNOWLEDGE_LIBRARY_BY_ID = ':countryCode/knowledge-library/:id',
  PEOPLE_TEAM = 'people-team',
  NEW_CALIBRATION = 'calibration',
  CALIBRATION = 'calibration/:type',
  CALIBRATION_SESSION = 'calibration-session',
  NOTES = 'notes',
  NOTES_INFO = 'notes/info',
  PRIORITY_NOTE = 'notes/priority-note/:uuid',
  PRIORITY_NOTE_EDIT = 'notes/priority-note/edit/:uuid/:noteUuid',
  PERSONAL_NOTE = 'notes/personal-note/:uuid/view',
  PERSONAL_NOTE_CREATE = 'notes/personal-note/:uuid',
  PERSONAL_NOTE_FOLDER_CREATE = 'notes/personal-note-folder/:uuid',
  TEAM_NOTE = 'notes/team-note/:uuid/view',
  TEAM_NOTE_CREATE = 'notes/team-note/:uuid',
  TEAM_NOTE_FOLDER_CREATE = 'notes/team-note-folder/:uuid',
  GIVE_FEEDBACK = 'feedbacks/give',
  GIVE_NEW_FEEDBACK = 'feedbacks/give/:uuid',
  REQUEST_FEEDBACK = 'feedbacks/request',
  RESPOND_FEEDBACK = 'feedbacks/respond',
  RESPOND_NEW_FEEDBACK = 'feedbacks/respond/:uuid',
  VIEW_FEEDBACK = 'feedbacks/view',
  FEEDBACKS = 'feedbacks',
  FEEDBACK_360_INFO = 'feedbacks/360-info',
  TIPS = 'tips',
  EDIT_TIP = 'tips/:tipUuid',
  REPORT = 'report',
  REPORT_STATISTICS = 'report/:type',
  CALIBRATION_RATINGS = 'calibration-ratings/:type',
  PREVIOUS_RATINGS_TILES = 'previous-ratings-tiles/:uuid',
  PREVIOUS_CALIBRATION_RATINGS = 'previous-calibration-ratings/:uuid',
  PREVIOUS_OBJECTIVES_RATINGS = 'previous-objective-ratings/:uuid',
  PREVIOUS_REVIEW_FORMS = 'previous-review-forms/:uuid',
  NOT_FOUND = '404',
  // TODO: enabled when content of page meets business requirements
  // ADMINISTRATION = 'administration',
}

type PageElement =
  // eslint-disable-next-line
  LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
