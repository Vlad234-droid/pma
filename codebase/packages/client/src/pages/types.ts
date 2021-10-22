import { ComponentType, FC, LazyExoticComponent } from 'react';

enum Page {
  CAREER_PERFORMANCE = 'career-performance',
  CREATE_PERFORMANCE_CYCLE = 'create-performance-cycle',
  PERFORMANCE_CYCLE = 'performance-cycle',
  OBJECTIVES_VIEW = 'objectives',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  MY_TEAM = 'my-team',
  ACTIONS = 'actions',
}

type PageElement =
  // eslint-disable-next-line
  LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
