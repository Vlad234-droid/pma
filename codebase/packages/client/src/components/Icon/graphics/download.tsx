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
        d='M10.5561 12.1498V1.66699H9.44497V12.1498L5.76817 8.38657L4.97341 9.16309L9.60315 13.9016L10.0005 14.3084L10.3979 13.9016L15.0277 9.16309L14.2329 8.38657L10.5561 12.1498ZM1.66699 18.3337V17.2225H18.3341V18.3337H1.66699Z'
        fill={fill}
      />
    </>
  );
};
