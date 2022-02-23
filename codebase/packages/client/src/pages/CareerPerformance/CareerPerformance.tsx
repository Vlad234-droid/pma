import React, { FC } from 'react';

import CareerPerformance from 'features/CareerPerformance';
import ViewNavigation from 'features/ViewNavigation';

const CareerPerformancePage: FC = () => (
  <div>
    <ViewNavigation />
    <CareerPerformance />
  </div>
);

export default CareerPerformancePage;
