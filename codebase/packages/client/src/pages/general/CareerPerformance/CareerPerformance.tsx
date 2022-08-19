import React, { FC, useMemo } from 'react';
import { colleagueUUIDSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';

import ViewNavigation from 'features/general/ViewNavigation';
import { useTenant } from 'features/general/Permission';
import { CareerHeaderSection, CareerPerformance } from 'features/general/CareerPerformance';
import { ReviewsSection } from 'features/general/Reviews';
import { PDPWidget } from 'features/general/PDP';
import { FeedbackView } from 'features/general/Feedback';
import { MyNotesView } from 'features/general/Notes';
import { ObjectiveView } from 'features/general/Objectives';

const CareerPerformancePage: FC = () => {
  const tenant = useTenant();
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const Timeline = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Timeline`).then((module) => ({ default: module.default }))),
    [],
  );

  return (
    <div>
      <ViewNavigation />
      <CareerPerformance>
        <CareerHeaderSection timeline={<Timeline colleagueUuid={colleagueUuid} />} />
        <div className={css(wrapperStyle)}>
          <ObjectiveView />
          <PDPWidget />
          <FeedbackView />
          <MyNotesView />
        </div>
        <ReviewsSection colleagueUuid={colleagueUuid} />
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
