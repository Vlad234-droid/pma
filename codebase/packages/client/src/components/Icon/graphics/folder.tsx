import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const Folder: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.79522 2H1V21.5556L23 21.495V6.48384L12.1074 6.48314L9.79522 2ZM2.5349 3.54369H8.86118L10.3879 6.50244H2.5349V3.54369ZM2.5349 8.04613V20.0072L21.4651 19.9557V8.04613H2.5349Z'
      fill={color}
    />
  );
};
