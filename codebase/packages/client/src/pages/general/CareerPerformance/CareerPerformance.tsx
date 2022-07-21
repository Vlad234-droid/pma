import React, { FC, useMemo } from 'react';
import { colleagueUUIDSelector } from '@pma/store';

import { useSelector } from 'react-redux';

import ViewNavigation from 'features/general/ViewNavigation';
import { useTenant } from 'features/general/Permission';
import { CareerHeaderSection, CareerPerformance, CareerReviewsSection } from 'features/general/CareerPerformance';
import { ObjectiveWidgets } from 'features/general/ObjectiveWidgets';

const CareerPerformancePage: FC = () => {
  const tenant = useTenant();
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
        <ObjectiveWidgets />
        <CareerReviewsSection />
      </CareerPerformance>
    </div>
  );
};

export default CareerPerformancePage;
