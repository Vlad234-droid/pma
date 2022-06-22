import { ComponentType, FC, LazyExoticComponent } from 'react';

enum Page {
  CONTRIBUTION = 'contribution',
  CREATE_STRATEGIC_DRIVERS = 'strategic-drivers/create',
  STRATEGIC_DRIVERS = 'strategic-drivers',
  PERFORMANCE_CYCLE_POPULATION_MATRIX = 'performance-cycle/population-matrix',
  CREATE_PERFORMANCE_CYCLE = 'performance-cycle/:performanceCycleUuid',
  PERFORMANCE_CYCLE = 'performance-cycle',
  PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan',
  CREATE_PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan/create',
  UPDATE_PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan/update/:uuid',
  PERSONAL_DEVELOPMENT_HELP = 'personal-development-plan/help',
  OBJECTIVES_VIEW = 'objectives',
  USER_OBJECTIVES = 'user-objective/:uuid',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  MY_TEAM = 'my-team',
  KNOWLEDGE_LIBRARY = 'knowledge-library',
  KNOWLEDGE_LIBRARY_BY_ID = ':countryCode/knowledge-library/:id',
  MY_ACTIONS = 'my-team/actions',
  PEOPLE_TEAM = 'people-team',
  CALIBRATION = 'calibration/:type',
  NOTES = 'notes',
  NOTES_INFO = 'notes/info',
  PERSONAL_NOTE = 'notes/personal-note/:uuid/view',
  PERSONAL_NOTE_CREATE = 'notes/personal-note/:uuid',
  PERSONAL_NOTE_FOLDER_CREATE = 'notes/personal-note-folder/:uuid',
  TEAM_NOTE = 'notes/team-note/:uuid/view',
  TEAM_NOTE_CREATE = 'notes/team-note/:uuid',
  TEAM_NOTE_FOLDER_CREATE = 'notes/team-note-folder/:uuid',
  GIVE_FEEDBACK = 'feedback/give',
  GIVE_NEW_FEEDBACK = 'feedback/give/:uuid',
  REQUEST_FEEDBACK = 'feedback/request-feedback',
  RESPOND_FEEDBACK = 'feedback/respond-feedback',
  RESPOND_NEW_FEEDBACK = 'feedback/respond-feedback/:uuid',
  VIEW_FEEDBACK = 'feedback/view-feedback',
  FEEDBACK = 'feedback',
  TIPS = 'tips',
  EDIT_TIP = 'tips/:tipUuid',
  REPORT = 'report',
  TILE_REPORT_STATISTICS = 'report/:type',
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
