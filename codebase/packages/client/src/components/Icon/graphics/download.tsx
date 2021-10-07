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
        stroke='null'
        fill={fill}
        d='m12.54583,14.85861l0,-13.19211l-1.39831,0l0,13.19211l-4.62708,-4.73584l-1.00017,0.97721l5.82631,5.96331l0.50005,0.51181l0.50011,-0.51181l5.82639,-5.96331l-1.00022,-0.97721l-4.62708,4.73584zm-11.18653,7.78215l0,-1.39839l20.97478,0l0,1.39839l-20.97478,0z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
