import React, { FC } from 'react';

import CareerPerformance from 'features/general/CareerPerformance';
import ViewNavigation from 'features/general/ViewNavigation';

const CareerPerformancePage: FC = () => (
  <div>
    <ViewNavigation />
    <CareerPerformance />
  </div>
);

export default CareerPerformancePage;
