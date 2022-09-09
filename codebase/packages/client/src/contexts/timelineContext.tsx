import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, userTimelineSelector } from '@pma/store';
import { ReviewType, Status } from 'config/enum';
import { Timeline } from '../config/types';

const defaultData = {
  activeCode: {},
  setActiveCode: () => ({}),
};

export type TimelineData = {
  activeCode: { [key in ReviewType]: string } | {};
  setActiveCode: (type: ReviewType, code: string) => void;
};

const TimelineContext = createContext<TimelineData>(defaultData);

export const TimelineProvider: FC = ({ children }) => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const userTimelines: Timeline[] = useSelector(userTimelineSelector(colleagueUuid));
  const timelines = userTimelines.map(({ status, summaryStatus, uuid, reviewType, colleagueCycleUuid, code }) => ({
    status,
    summaryStatus,
    uuid,
    reviewType,
    colleagueCycleUuid,
    code,
  }));

  const [activeCode, setCode] = useState<{ [key in ReviewType]: string } | {}>({});
  const setActiveCode = (type: ReviewType, code: string) => {
    setCode((state) => ({ ...state, [type]: code }));
  };

  useEffect(() => {
    const activeCodes = timelines?.reduce((acc, current) => {
      if ([Status.STARTED, Status.FINISHING].includes(current.status)) {
        acc[current.reviewType] = current.code;
      }
      return acc;
    }, {});
    setCode(activeCodes);
  }, [JSON.stringify(timelines)]);

  return <TimelineContext.Provider value={{ activeCode, setActiveCode }}>{children}</TimelineContext.Provider>;
};

export const useTimelineContainer = () => useContext(TimelineContext);
