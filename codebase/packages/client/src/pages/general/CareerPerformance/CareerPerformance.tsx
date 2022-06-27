import React, { FC } from 'react';

import { CareerPerformanceContainer } from 'features/general/CareerPerformance';
import ViewNavigation from 'features/general/ViewNavigation';

const CareerPerformancePage: FC = () => (
  <div>
    <ViewNavigation />
    <CareerPerformanceContainer />
  </div>
);

export default CareerPerformancePage;
