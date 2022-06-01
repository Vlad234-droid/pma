import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Hamburger: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M22 5.5H2V4H22V5.5ZM22 20.5H2V19H22V20.5ZM2 13H22V11.5H2V13Z'
      fill={color}
    />
  );
};
