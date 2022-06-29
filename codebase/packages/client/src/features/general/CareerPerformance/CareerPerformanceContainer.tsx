import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  getTimelineSelector,
  timelinesExistSelector,
  getTimelineMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';

import { ObjectiveType } from 'config/enum';

import { USER } from 'config/constants';
import { CareerPerformance } from './components/CareerPerformance';

const CareerPerformanceContainer: FC = () => {
  const { descriptions, startDates, summaryStatuses } = useSelector(getTimelineSelector(USER.current)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current));
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR, USER.current));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR, USER.current));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded } = useSelector(getTimelineMetaSelector);

  return (
    <CareerPerformance
      descriptions={descriptions}
      startDates={startDates}
      statuses={summaryStatuses}
      timelineTypes={timelineTypes}
      midYearReview={midYearReview}
      endYearReview={endYearReview}
      displayTimelines={timelinesExist}
      loading={!loaded}
    />
  );
};

export default CareerPerformanceContainer;