import React from 'react';

import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const ArrowDown: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        fill={stroke}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 7.04199L20.9204 6L11.996 15.2463L3.08004 6.00022L2 7.04171L11.9955 17.4073L22 7.04199Z'
      />
    </>
  );
};
