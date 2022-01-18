import React from 'react';
import { useStyle } from '@dex-ddl/core';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Hamburger: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        id='hamburger'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20 1.5H0V0H20V1.5ZM20 16.5H0V15H20V16.5ZM0 9H20V7.5H0V9Z'
        fill={stroke}
      />
    </>
  );
};
