import React from 'react';

import { useStyle } from '@dex-ddl/core';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Download: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const fill = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.6669 12.5793V0H9.33357V12.5793L4.92142 8.0635L3.9677 8.99532L9.52339 14.6816L10.0003 15.1697L10.4771 14.6816L16.0328 8.99532L15.0791 8.0635L10.6669 12.5793ZM0 20V18.6666H20.0005V20H0Z'
        fill={fill}
      />
    </>
  );
};
