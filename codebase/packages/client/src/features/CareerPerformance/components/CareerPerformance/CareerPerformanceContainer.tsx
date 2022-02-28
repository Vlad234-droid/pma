import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  getTimelineSelector,
  PDPActions,
  timelinesExistSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { ObjectiveType } from 'config/enum';

import CareerPerformance from './CareerPerformance';

const CareerPerformanceContainer: FC = () => {
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector('me')) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector('me'));
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR, 'me'));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR, 'me'));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));

  const dispatch = useDispatch();

  const loadTimeline = (colleagueUuid: string) => {
    dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    dispatch(PDPActions.getPDPGoal({}));
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
      displayTimelines={timelinesExist}
    />
  );
};

export default CareerPerformanceContainer;
