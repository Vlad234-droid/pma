import { Page, PageElement } from './types';

import CareerPerformance from './CareerPerformance';
import Objectives from './Objectives';

const pages: Record<Page, PageElement> = {
  [Page.CAREER_PERFORMANCE]: CareerPerformance,
  [Page.OBJECTIVES_VIEW]: Objectives,
  [Page.NOT_FOUND]: () => null,
};

export default pages;
