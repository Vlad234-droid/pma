import React from 'react';
import { useStyle } from '@dex-ddl/core';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Account: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <g transform='matrix(0.85714287 0 0 0.85714287 0 0)'>
      <path
        transform='matrix(1 0 0 1 0 0)'
        d='M19.3364 6.37646C 19.3364 9.32369 16.9472 11.7129 14 11.7129C 11.0528 11.7129 8.66357 9.32369 8.66357 6.37646C 8.66357 3.42923 11.0528 1.04004 14 1.04004C 16.9472 1.04004 19.3364 3.42923 19.3364 6.37646z'
        stroke={stroke}
        strokeWidth='1.5'
        fill='none'
      />
      <path
        transform='matrix(1 0 0 1 0 0)'
        d='M1.0401 26.9597C 2.59224 20.7222 8.01709 16.2869 14 16.2869C 19.9829 16.2869 25.4077 20.7222 26.9599 26.9597L26.9599 26.9597L1.0401 26.9597z'
        stroke={stroke}
        strokeWidth='1.5'
        fill='none'
      />
    </g>
  );
};
