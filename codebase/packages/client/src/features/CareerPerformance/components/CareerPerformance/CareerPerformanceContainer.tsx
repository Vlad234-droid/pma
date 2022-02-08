import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  getTimelineSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { ObjectiveType } from 'config/enum';

import CareerPerformance from './CareerPerformance';

const CareerPerformanceContainer: FC = () => {
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector);
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR));
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const dispatch = useDispatch();

  const loadTimeline = (colleagueUuid: string) => {
    dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  };

  return (
    <CareerPerformance
      loadTimeline={loadTimeline}
      descriptions={descriptions}
      startDates={startDates}
      statuses={statuses}
      timelineTypes={timelineTypes}
      midYearReview={midYearReview}
      endYearReview={endYearReview}
      colleagueUuid={colleagueUuid}
    />
  );
};


export default CareerPerformanceContainer;
