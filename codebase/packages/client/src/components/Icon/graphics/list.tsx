import React from 'react';

import { FCGraphicProps } from './types';
import { useStyle } from '@pma/dex-wrapper';
import { invertColor } from 'components/Icon/utils';

export const List: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);
  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 3H6.1791V7.15385H2V3ZM3.19403 4.18681V5.96703H4.98507V4.18681H3.19403ZM22 5.67033H9.06468V4.48352H22V5.67033ZM2 9.92308H6.1791V14.0769H2V9.92308ZM3.19403 11.1099V12.8901H4.98507V11.1099H3.19403ZM22 12.5934H9.06468V11.4066H22V12.5934ZM2 16.8462H6.1791V21H2V16.8462ZM3.19403 18.033V19.8132H4.98507V18.033H3.19403ZM22 19.5165H9.06468V18.3297H22V19.5165Z'
      fill={color}
    />
  );
};
