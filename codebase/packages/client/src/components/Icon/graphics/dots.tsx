import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const Dots: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6 14C4.896 14 4 13.103 4 12C4 10.897 4.896 10 6 10C7.104 10 8 10.897 8 12C8 13.103 7.104 14 6 14ZM12 14C10.896 14 10 13.103 10 12C10 10.897 10.896 10 12 10C13.104 10 14 10.897 14 12C14 13.103 13.104 14 12 14ZM16 12C16 13.103 16.896 14 18 14C19.104 14 20 13.103 20 12C20 10.897 19.104 10 18 10C16.896 10 16 10.897 16 12Z'
      fill={color}
    />
  );
};
