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

import CareerPerformance from './CareerPerformance';
import { USER } from 'config/constants';

const CareerPerformanceContainer: FC = () => {
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector(USER.current)) || {};
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
      statuses={statuses}
      timelineTypes={timelineTypes}
      midYearReview={midYearReview}
      endYearReview={endYearReview}
      displayTimelines={timelinesExist}
      loading={!loaded}
    />
  );
};

export default CareerPerformanceContainer;
