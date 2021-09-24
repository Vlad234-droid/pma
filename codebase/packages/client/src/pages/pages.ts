import { Page, PageElement } from './types';

import CareerPerformance from './CareerPerformance';
import Objectives from './Objectives';
import Profile from './Profile';

const pages: Record<Page, PageElement> = {
  [Page.CAREER_PERFORMANCE]: CareerPerformance,
  [Page.OBJECTIVES_VIEW]: Objectives,
  [Page.PROFILE]: Profile,
  [Page.NOT_FOUND]: () => null,
};

export default pages;
