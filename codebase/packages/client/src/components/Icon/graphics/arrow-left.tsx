import React, { FC } from 'react';

import { useStyle } from 'styles';

import { invertColor } from '../utils';

import { GraphicProps } from './types';

export const ArrowLeft: FC<GraphicProps> = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='arrowLeft'
        fill={stroke}
        d='M11.407 3.08004L10.3655 2L0 11.9955L10.3653 22L11.4073 20.9204L2.161 11.996L11.407 3.08004Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
