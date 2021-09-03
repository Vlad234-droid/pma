import { ComponentType, FC, LazyExoticComponent } from 'react';

enum Page {
  CAREER_PERFORMANCE = 'career-performance',
  OBJECTIVES_VIEW = 'objectives',
  NOT_FOUND = '*',
}

type PageElement =
  // eslint-disable-next-line
  LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
