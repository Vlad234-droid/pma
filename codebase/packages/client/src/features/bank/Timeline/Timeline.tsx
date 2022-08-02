import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getTimelineMetaSelector, getBankTimelineSelector, userCycleTypeSelector } from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import { CycleType } from 'config/enum';

const Timeline: FC<{ colleagueUuid: string }> = ({ colleagueUuid }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const { loading } = useSelector(getTimelineMetaSelector);
  const { descriptions, startDates, summaryStatuses, types, currentStep } =
    useSelector(getBankTimelineSelector(colleagueUuid)) || {};
  const cycleType = useSelector(userCycleTypeSelector);

  if (cycleType === CycleType.HIRING) return null;

  return (
    <div className={css(timelineWrapperStyles)}>
      {loading ? (
        <Spinner id='1' />
      ) : (
        <StepIndicator
          mainTitle={t('quarterly_priority_timeline', 'Quarterly Priority Timeline')}
          titles={descriptions}
          activeStep={currentStep}
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
