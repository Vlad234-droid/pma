import React, { FC } from 'react';

import { useStyle } from 'styles';

import { invertColor } from '../utils';

import { GraphicProps } from './types';

export const Add: FC<GraphicProps> = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='add'
        fill={stroke}
        d='m12,21.68c5.34611,0 9.68,-4.33389 9.68,-9.68c0,-5.34612 -4.33389,-9.68 -9.68,-9.68c-5.34612,0 -9.68,4.33388 -9.68,9.68c0,5.34611 4.33388,9.68 9.68,9.68zm0,1.32c6.07508,0 11,-4.92492 11,-11c0,-6.07513 -4.92492,-11 -11,-11c-6.07513,0 -11,4.92486 -11,11c0,6.07508 4.92486,11 11,11zm-0.55,-10.45l-3.46042,0l0,-1.1l3.46042,0l0,-3.46042l1.1,0l0,3.46042l3.46038,0l0,1.1l-3.46038,0l0,3.46038l-1.1,0l0,-3.46038z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
