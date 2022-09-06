import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getTimelineSelector,
  timelineTypesAvailabilitySelector,
  userCycleTypeSelector,
  TimelineActions,
} from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { useTranslation } from 'components/Translation';

import { CycleType, ReviewType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

const Timeline: FC<{ colleagueUuid: string }> = ({ colleagueUuid }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const { descriptions, startDates, summaryStatuses, types } = useSelector(getTimelineSelector(colleagueUuid)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const cycleType = useSelector(userCycleTypeSelector);

  const isEYRTimeline =
    timelineTypes[ReviewType.EYR] &&
    !timelineTypes[ReviewType.MYR] &&
    !timelineTypes[ReviewType.OBJECTIVE] &&
    !timelineTypes[ReviewType.QUARTER];

  if (isEYRTimeline || cycleType === CycleType.HIRING) return null;

  useEffect(() => {
    dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  }, []);

  return (
    <div className={css(timelineWrapperStyles)}>
      <StepIndicator
        mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
        titles={descriptions}
        descriptions={startDates}
        statuses={summaryStatuses}
        types={types}
      />
    </div>
  );
};

export default Timeline;

const timelineWrapperStyles: Rule = {
  flex: '3 1 70%',
  display: 'flex',
  flexDirection: 'column',
};
