import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import CalibrationSessionOverview, {
  CalibrationsCompleted,
  RatingsChange,
  RatingsSubmitted,
  Widget,
} from 'features/general/CalibrationSession';
import { Filter } from 'features/general/CalibrationSession/components/Filter';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';

import { Page } from 'pages/general/types';

const CalibrationSessionPage: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [period, setPeriod] = useState<string>('2021 - 2022');

  return (
    <div>
      <div>
        <Filter withDateFilter setPeriod={(active) => setPeriod(active)} />
        <div className={css(widgetContainerStyles)}>
          <Widget title={t('download_report', 'Download report')} graphics={'download'} onClick={console.log} />
          <Widget
            title={t('calibration_sessions', 'Calibration sessions')}
            graphics={'chart'}
            onClick={() => navigate(buildPath(Page.CALIBRATION_SESSION_LIST))}
          />
          <Widget
            title={t('create_calibration_session', 'Create calibration session')}
            graphics={'add'}
            onClick={() => navigate(buildPath(Page.CREATE_CALIBRATION_SESSION))}
          />
          <RatingsSubmitted />
          <CalibrationsCompleted />
          <RatingsChange />
        </div>
      </div>
      <CalibrationSessionOverview period={period} />
    </div>
  );
};

const widgetContainerStyles: Rule = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '8px',
  marginBottom: '56px',
};

export default CalibrationSessionPage;
