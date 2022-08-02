import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  getTimelineMetaSelector,
  getTimelineSelector,
  timelineTypesAvailabilitySelector,
  userCycleTypeSelector,
} from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import { CycleType, ReviewType } from 'config/enum';

const Timeline: FC<{ colleagueUuid: string }> = ({ colleagueUuid }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const { loading } = useSelector(getTimelineMetaSelector);
  const { descriptions, startDates, summaryStatuses, types } = useSelector(getTimelineSelector(colleagueUuid)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const cycleType = useSelector(userCycleTypeSelector);

  const isEYRTimeline =
    timelineTypes[ReviewType.EYR] &&
    !timelineTypes[ReviewType.MYR] &&
    !timelineTypes[ReviewType.OBJECTIVE] &&
    !timelineTypes[ReviewType.QUARTER];

  if (isEYRTimeline || cycleType === CycleType.HIRING) return null;

  return (
    <div className={css(timelineWrapperStyles)}>
      {loading ? (
        <Spinner id='1' />
      ) : (
        <StepIndicator
          mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
          titles={descriptions}
          descriptions={startDates}
          statuses={summaryStatuses}
          types={types}
        />
      )}
    </div>
  );
};

export default Timeline;

const timelineWrapperStyles: Rule = {
  flex: '3 1 70%',
  display: 'flex',
  flexDirection: 'column',
};
