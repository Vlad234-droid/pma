import React from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { invertColor } from 'components/Icon/utils';
import { FCGraphicProps } from 'components/Icon/graphics/types';

export const Clock: FCGraphicProps = ({ invertColors, color = '' }) => {
  const { theme } = useStyle();

  const fillColor = invertColor(theme.colors.link, invertColors, theme);
  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.5 12C3.5 7.30528 7.30528 3.5 12 3.5C16.6947 3.5 20.5 7.30528 20.5 12C20.5 16.6947 16.6947 20.5 12 20.5C7.30528 20.5 3.5 16.6947 3.5 12ZM12 1.5C6.20072 1.5 1.5 6.20072 1.5 12C1.5 17.7993 6.20072 22.5 12 22.5C17.7993 22.5 22.5 17.7993 22.5 12C22.5 6.20072 17.7993 1.5 12 1.5ZM11 5.5V11.5H7V13.5H12H13V12.5V5.5H11Z'
      fill={theme.colors[color] || fillColor}
    />
  );
};
