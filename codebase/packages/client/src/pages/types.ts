import { ComponentType, FC, LazyExoticComponent } from 'react';

enum Page {
  CONTRIBUTION = 'contribution',
  CREATE_STRATEGIC_DRIVERS = 'strategic-drivers/create',
  STRATEGIC_DRIVERS = 'strategic-drivers',
  CREATE_PERFORMANCE_CYCLE = 'performance-cycle/:performanceCycleUuid',
  PERFORMANCE_CYCLE = 'performance-cycle',
  PERSONAL_DEVELOPMENT_PLAN = 'personal-development-plan',
  OBJECTIVES_VIEW = 'objectives',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  MY_TEAM = 'my-team',
  ACTIONS = 'actions',
  FEEDBACK = 'feedback',
  GIVE_FEEDBACK = 'give-feedback',
  REQUEST_FEEDBACK = 'request-feedback',
  RESPOND_FEEDBACK = 'respond-feedback',
  VIEW_FEEDBACK = 'view-feedback',
}

type PageElement =
  // eslint-disable-next-line
  LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
