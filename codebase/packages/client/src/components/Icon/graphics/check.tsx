import React from 'react';

import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Check: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='check'
        fill={stroke}
        d='M22 6.10655L20.8934 5L8.5703 17.3232L3.10655 11.8594L2 12.966L8.5703 19.5363L22 6.10655Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
