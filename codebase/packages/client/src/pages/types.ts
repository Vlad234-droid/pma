import { ComponentType, FC, LazyExoticComponent } from 'react';

enum Page {
  MY_VIEW = 'my-view',
  CREATE_ORGANIZATION_OBJECTIVES = 'create-strategic-priorities',
  VIEW_ORGANIZATION_OBJECTIVES = 'view-strategic-priorities',
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
