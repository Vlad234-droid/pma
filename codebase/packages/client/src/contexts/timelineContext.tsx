import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { colleagueCurrentCycleSelector, colleagueUUIDSelector, userTimelineSelector } from '@pma/store';
import { ReviewType, Status } from 'config/enum';
import { Timeline } from '../config/types';

type Identifiers = Pick<Timeline, 'code' | 'uuid'>;
type TimelinePoints = Partial<Record<ReviewType, Identifiers>>;

const defaultData = {
  activeTimelines: {},
  currentTimelines: {},
  setActiveTimeline: () => ({}),
};

export type TimelineData = {
  activeTimelines: TimelinePoints;
  currentTimelines: TimelinePoints;
  setActiveTimeline: (type: ReviewType, code: Identifiers) => void;
};

const TimelineContext = createContext<TimelineData>(defaultData);

export const TimelineProvider: FC = ({ children }) => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const userTimelines: Timeline[] = useSelector(userTimelineSelector(colleagueUuid, currentCycle));
  const timelines = userTimelines.map(({ lastUpdatedTime, statistics, ...rest }) => ({
    ...rest,
  }));

  const [activeTimelines, setActiveTimelines] = useState<TimelinePoints>({});
  const [currentTimelines, setCurrentTimelines] = useState<TimelinePoints>({});
  const setActiveTimeline = (type: ReviewType, identifiers: Identifiers) => {
    setActiveTimelines((state) => ({ ...state, [type]: identifiers }));
  };

  useEffect(() => {
    const activePoints = timelines?.reduce((acc, current) => {
      if ([Status.STARTED, Status.FINISHING, Status.OVERDUE, Status.COMPLETED].includes(current.status)) {
        acc[current.reviewType] = { code: current.code, uuid: current.uuid };
      }
      return acc;
    }, {});
    setActiveTimelines(activePoints);
    setCurrentTimelines(activePoints);
  }, [JSON.stringify(timelines)]);

  return (
    <TimelineContext.Provider value={{ activeTimelines, currentTimelines, setActiveTimeline }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContainer = () => useContext(TimelineContext);
