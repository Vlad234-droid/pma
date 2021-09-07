import React from 'react';

import { useStyle } from '@dex-ddl/core';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Calender: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='calender'
        fill={stroke}
        d='M5.7921 5.81224V4.23709H2.65679V7.38756H17.3433V4.23709H14.2079V5.81224H13.2178V4.23709H6.7822V5.81224H5.7921ZM13.2178 3.24215H6.7822V1.66667H5.7921V3.24215H2.16174H1.66669V3.73962V17.8346V18.3333L2.16304 18.332L17.8396 18.2906L18.3334 18.2893V17.7931V3.73962V3.24215H17.8383H14.2079V1.66667H13.2178V3.24215ZM2.65679 8.3825V17.3358L17.3433 17.2969V8.3825H2.65679Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
