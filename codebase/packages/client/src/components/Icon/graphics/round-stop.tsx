import React, { FC } from 'react';

import { useStyle } from 'styles';

import { invertColor } from '../utils';

import { GraphicProps } from './types';

export const RoundStop: FC<GraphicProps> = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='roundStop'
        fill={stroke}
        d='M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.1667 5.83333H5.83333V14.1667H14.1667V5.83333Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
