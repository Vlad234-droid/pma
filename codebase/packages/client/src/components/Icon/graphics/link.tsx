import React from 'react';

import { FCGraphicProps } from './types';
import { useStyle } from '@pma/dex-wrapper';
import { invertColor } from 'components/Icon/utils';

export const Link: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);
  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15 0.199997H24.4667V9.66666H22.8667V2.93137L11.5662 14.2318L10.4348 13.1004L21.7353 1.8H15V0.199997ZM0.200001 4.2H11V5.8H1.8V22.8667H18.8667V13.6667H20.4667V24.4667H0.200001V4.2Z'
      fill={color}
    />
  );
};
