import React from 'react';

import { useStyle } from '@dex-ddl/core';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Information: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  return (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z'
        fill={invertColor(theme.colors.link, invertColors, theme)}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.9 6.6C12.9 7.0974 12.4968 7.5 12 7.5C11.5032 7.5 11.1 7.0974 11.1 6.6C11.1 6.1026 11.5032 5.7 12 5.7C12.4968 5.7 12.9 6.1026 12.9 6.6Z'
        stroke={invertColor(theme.colors.white, invertColors, theme)}
        strokeWidth='1.2'
      />
      <path d='M10.2 9.9H12V17.4' stroke={invertColor(theme.colors.white, invertColors, theme)} strokeWidth='1.2' />
      <path d='M9.60001 17.7H14.4' stroke={invertColor(theme.colors.white, invertColors, theme)} strokeWidth='1.2' />
    </>
  );
};
