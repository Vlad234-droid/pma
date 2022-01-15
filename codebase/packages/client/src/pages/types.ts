import { ComponentType, FC, LazyExoticComponent } from 'react';

enum Page {
  CONTRIBUTION = 'contribution',
  CREATE_STRATEGIC_DRIVERS = 'strategic-drivers/create',
  STRATEGIC_DRIVERS = 'strategic-drivers',
  CREATE_PERFORMANCE_CYCLE = 'performance-cycle/:performanceCycleUuid',
  PERFORMANCE_CYCLE = 'performance-cycle',
  PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan',
  OBJECTIVES_VIEW = 'objectives',
  USER_OBJECTIVES = 'user-objective/:uuid',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  MY_TEAM = 'my-team',
  MY_ACTIONS = 'my-team/actions',
  NOTES = 'notes',
  GIVE_FEEDBACK = 'feedback/give-feedback',
  REQUEST_FEEDBACK = 'feedback/request-feedback',
  RESPOND_FEEDBACK = 'feedback/respond-feedback',
  VIEW_FEEDBACK = 'feedback/view-feedback',
  FEEDBACK = 'feedback',
  TIPS = 'tips',
  CREATE_TIP = 'create-tips',
  EDIT_TIP = 'edit-tips/:tipUuid',
  REPORT = 'report',
}

type PageElement =
  // eslint-disable-next-line
  LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
