import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Filter } from './components/Filter';
import { SessionAccordion } from './components/SessionAccordion';
import { CreateCalibrationSession } from './widgets';

const CalibrationSession = () => {
  const { css } = useStyle();

  return (
    <div>
      <Filter setStatus={console.log} />
      <div className={css(bodyStyle)}>
        <div className={css(leftColumnStyle)}>
          <div className={css(titleStyle)}>Calibration Sessions</div>
          <SessionAccordion isFirst={true} />
          <SessionAccordion />
        </div>
        <div className={css(rightColumnStyle)}>
          <CreateCalibrationSession />
        </div>
      </div>
    </div>
  );
};

const bodyStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gridGap: '8px',
  marginTop: '34px',
  alignItems: 'stretch',
};

const leftColumnStyle: Rule = { flex: '3 1 375px', display: 'flex', flexDirection: 'column' };

const rightColumnStyle: Rule = { flex: '1 0 216px' };

const titleStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  letterSpacing: '0px',
});

export default CalibrationSession;
