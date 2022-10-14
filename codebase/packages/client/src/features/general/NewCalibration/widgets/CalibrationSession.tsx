import React, { FC } from 'react';
import { Rule, theme } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';

import BaseWidget from 'components/BaseWidget';

const CalibrationSession: FC = () => {
  const { t } = useTranslation();

  return (
    <BaseWidget
      iconGraphic={'chart'}
      title={t('calibration_sessions', 'Calibration sessions')}
      onClick={console.log}
      hover={false}
      withButton={false}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        ...tileWrapperStyles,
        '& span': {
          '&:last-child': {
            fontSize: theme.font.fixed.f16.fontSize,
            marginBottom: '8px',
          },
        },
      }}
    />
  );
};

export default CalibrationSession;

const tileWrapperStyles: Rule = { minWidth: '350px' };
