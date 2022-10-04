import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTimelineSelector, TimelineActions, timelinesMetaSelector } from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';

import useDispatch from 'hooks/useDispatch';

const Timeline: FC<{ colleagueUuid: string }> = ({ colleagueUuid }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const { loading } = useSelector(timelinesMetaSelector);
  const { descriptions, startDates, summaryStatuses, types } = useSelector(getTimelineSelector(colleagueUuid)) || {};

  useEffect(() => {
    dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  }, []);

  return (
    <div className={css(timelineWrapperStyles)}>
      {loading ? (
        <Spinner />
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
