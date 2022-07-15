import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  timelinesExistSelector,
  getTimelineMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';

import { ReviewType } from 'config/enum';

import { USER } from 'config/constants';
import { CareerPerformance } from './components/CareerPerformance';

const CareerPerformanceContainer: FC = () => {
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current));
  const midYearReview = useSelector(getTimelineByCodeSelector(ReviewType.MYR, USER.current));
  const endYearReview = useSelector(getTimelineByCodeSelector(ReviewType.EYR, USER.current));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded } = useSelector(getTimelineMetaSelector);

  return (
    <CareerPerformance
      timelineTypes={timelineTypes}
      midYearReview={midYearReview}
      endYearReview={endYearReview}
      displayTimelines={timelinesExist}
      loading={!loaded}
    />
  );
};

export default CareerPerformanceContainer;
