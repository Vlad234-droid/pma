import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const ArrowLeft: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.407 3.08004L10.3655 2L0 11.9955L10.3653 22L11.4073 20.9204L2.161 11.996L11.407 3.08004Z'
      fill={color}
    />
  );
};
