import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Less: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.tescoBlue, invertColors, theme);

  return (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.00388 6.07277L1.93112 1L0.999996 1.93112L6.07276 7.00389H2.08523V8.32069H8.32069V2.08523H7.00388V6.07277ZM17.9272 7.00389L23 1.93112L22.0689 1L16.9961 6.07277V2.08523H15.6793V8.32069H21.9148V7.00389H17.9272ZM2.08523 15.6793H8.32069V21.9148H7.00388V17.9272L1.93112 23L0.999996 22.0689L6.07276 16.9961H2.08523V15.6793ZM15.6793 15.6793H21.9148V16.9961H17.9272L23 22.0689L22.0689 23L16.9961 17.9272V21.9148H15.6793V15.6793Z'
        fill={color}
      />
    </>
  );
};
