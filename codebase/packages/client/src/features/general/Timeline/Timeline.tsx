import React from 'react';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, getTimelineMetaSelector, getTimelineSelector } from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';

const Timeline = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loading } = useSelector(getTimelineMetaSelector);
  const { descriptions, startDates, summaryStatuses } = useSelector(getTimelineSelector(colleagueUuid)) || {};

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
