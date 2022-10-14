import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import {
  DownloadReport,
  CalibrationSession,
  CreateCalibration,
  RatingsSubmitted,
  CalibrationsCompleted,
  RatingsChange,
} from './widgets';
import { Filter } from './components/Filter';

const NewCalibration = () => {
  const { css } = useStyle();

  return (
    <div>
      <Filter />
      <div className={css(widgetContainerStyles)}>
        <DownloadReport />
        <CalibrationSession />
        <CreateCalibration />
        <RatingsSubmitted />
        <CalibrationsCompleted />
        <RatingsChange />
      </div>
    </div>
  );
};

const widgetContainerStyles: Rule = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '8px',
};

export default NewCalibration;
