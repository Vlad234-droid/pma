import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const Download: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.6669 14.5793V2H11.3336V14.5793L6.92142 10.0635L5.9677 10.9953L11.5234 16.6816L12.0003 17.1697L12.4771 16.6816L18.0328 10.9953L17.0791 10.0635L12.6669 14.5793ZM2 22V20.6666H22.0005V22H2Z'
      fill={color}
    />
  );
};
