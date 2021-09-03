import React, { FC } from 'react';

import { useStyle } from 'styles';

import { invertColor } from '../utils';

import { GraphicProps } from './types';

export const Share: FC<GraphicProps> = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      stroke='null'
      fill={stroke}
      d='m12.03109,0.08859l0.48937,0.49274l5.28323,5.32007l-0.97846,0.97182l-4.10409,-4.13265l0,13.91467l-1.37922,0l0,-13.9151l-4.10358,4.13303l-0.97869,-0.97172l5.2822,-5.32006l0.48923,-0.4928zm-8.61932,8.33421l-0.68958,0l0,0.68958l0,13.79143l0,0.68963l0.68958,0l17.23944,0l0.68963,0l0,-0.68963l0,-13.79143l0,-0.68958l-0.68963,0l-4.02257,0l0,1.37915l3.33294,0l0,12.41237l-15.86022,0l0,-12.41237l3.33296,0l0,-1.37915l-4.02255,0z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  );
};
