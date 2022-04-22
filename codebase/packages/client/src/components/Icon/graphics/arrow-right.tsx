import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { FCGraphicProps } from './types';
import { invertColor } from '../utils';

export const ArrowRight: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();
  const stroke = invertColor(theme.colors.link, invertColors, theme);
  return (
    <>
      <path
        id='arrowRight'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24.4083 12.0045L14.0419 2L13 3.07962L22.2472 12.004L13.0002 20.9199L14.0416 22L24.4083 12.0045Z'
        fill={stroke}
        stroke='null'
      />
    </>
  );
};
