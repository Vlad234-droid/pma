import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Search: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.33154 9.87827C3.33154 6.26244 6.26244 3.33154 9.87827 3.33154C13.4941 3.33154 16.425 6.26244 16.425 9.87827C16.425 13.4941 13.4941 16.425 9.87827 16.425C6.26244 16.425 3.33154 13.4941 3.33154 9.87827ZM9.87827 2C5.52706 2 2 5.52706 2 9.87827C2 14.2295 5.52706 17.7565 9.87827 17.7565C11.8142 17.7565 13.5869 17.0584 14.9585 15.9001L21.0585 22L22 21.0585L15.9001 14.9585C17.0584 13.5869 17.7565 11.8142 17.7565 9.87827C17.7565 5.52706 14.2295 2 9.87827 2Z'
      fill={stroke}
    />
  );
};
