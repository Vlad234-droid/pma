import React from 'react';

import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Decline: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='decline'
        fill={stroke}
        d='M12 13.1429L20.8571 22L22 20.8571L13.1429 12L22 3.14291L20.8571 2L12 10.8571L3.14291 2L2 3.14291L10.8571 12L2 20.8571L3.14291 22L12 13.1429Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
