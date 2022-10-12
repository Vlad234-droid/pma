import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { DownloadReport } from './widgets';

const NewCalibration = () => {
  const { css } = useStyle();

  return (
    <div className={css(listStyles)}>
      <DownloadReport />
    </div>
  );
};

const listStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

export default NewCalibration;
