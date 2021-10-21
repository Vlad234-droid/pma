import { Page, PageElement } from './types';

import CareerPerformance from './CareerPerformance';
import MyTeam from './MyTeam';
import Actions from './Actions';
import Objectives from './Objectives';
import Profile from './Profile';

const pages: Record<Page, PageElement> = {
  [Page.MY_TEAM]: MyTeam,
  [Page.ACTIONS]: Actions,
  [Page.CAREER_PERFORMANCE]: CareerPerformance,
  [Page.OBJECTIVES_VIEW]: Objectives,
  [Page.PROFILE]: Profile,
};

export default pages;
