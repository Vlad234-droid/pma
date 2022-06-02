import React from 'react';

import { FCGraphicProps } from './types';
import { useStyle } from '@pma/dex-wrapper';
import { invertColor } from 'components/Icon/utils';

export const Play: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);
  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M21 12L3 22V2L21 12ZM17.9988 12L4.44219 4.46688V19.5317L17.9988 12Z'
      fill={color}
    />
  );
};
