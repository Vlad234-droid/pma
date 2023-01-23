import React, { FC, useMemo } from 'react';
import { colleagueUUIDSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';

import ViewNavigation from 'features/general/ViewNavigation';
import { useTenant } from 'features/general/Permission';
import { ReviewsSection } from 'features/general/Review';
import { PDPWidget } from 'features/general/PDP';
import { FeedbackView } from 'features/general/Feedback';
import { MyNotesView } from 'features/general/Notes';
import { CareerHeaderSection, CareerPerformance } from 'features/general/CareerPerformance';

const CareerPerformancePage: FC = () => {
  const tenant = useTenant();
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const Timeline = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Timeline`).then((module) => ({ default: module.default }))),
    [],
  );

  const ObjectiveWidget = useMemo(
    () =>
      React.lazy(() => import(`features/${tenant}/Objectives`).then((module) => ({ default: module.ObjectiveWidget }))),
    [],
  );

  return (
    <div>
      <ViewNavigation />
      <CareerPerformance>
        <CareerHeaderSection timeline={<Timeline colleagueUuid={colleagueUuid} />} />
        <div className={css(wrapperStyle)}>
          <ObjectiveWidget />
          <PDPWidget />
          <FeedbackView />
          <MyNotesView />
        </div>
        <ReviewsSection colleagueUuid={colleagueUuid} isUserView={true} />
      </CareerPerformance>
    </div>
  );
};

export default CareerPerformancePage;

const wrapperStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
};
