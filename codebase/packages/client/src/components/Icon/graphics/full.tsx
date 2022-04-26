import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Full: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.tescoBlue, invertColors, theme);

  return (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.833984 0.833008H5.94067V1.91144H2.67498L7.33695 6.57341L6.57439 7.33597L1.91242 2.67401V5.9397H0.833984V0.833008ZM14.0606 0.833008H19.1673V5.9397H18.0889V2.67401L13.4269 7.33597L12.6643 6.57341L17.3263 1.91144H14.0606V0.833008ZM2.67498 18.0879L7.33695 13.4259L6.57439 12.6634L1.91242 17.3253V14.0597H0.833984V19.1663H5.94067V18.0879H2.67498ZM18.0889 17.3253L13.4269 12.6634L12.6643 13.4259L17.3263 18.0879H14.0606V19.1663H19.1673V14.0597H18.0889V17.3253Z'
        fill={stroke}
      />
    </>
  );
};
