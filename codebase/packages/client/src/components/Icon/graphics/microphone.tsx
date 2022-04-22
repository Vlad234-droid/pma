import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Microphone: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='microphone'
        fill={stroke}
        d='M5.9434 6.46235C5.9434 4.34471 7.67796 2.61014 9.7956 2.61014C11.9132 2.61014 13.6478 4.34471 13.6478 6.46235V9.607C13.6478 11.7246 11.9132 13.4592 9.7956 13.4592C7.67796 13.4592 5.9434 11.7246 5.9434 9.607V6.46235ZM9.7956 1.66675C7.15694 1.66675 5 3.82369 5 6.46235V9.607C5 12.0865 6.90466 14.1407 9.3239 14.3794V17.39H6.65094V18.3334H12.9403V17.39H10.2673V14.3794C12.6865 14.1407 14.5912 12.0865 14.5912 9.607V6.46235C14.5912 3.82369 12.4343 1.66675 9.7956 1.66675ZM7.43711 6.93404H12.1541V5.99065H7.43711V6.93404ZM12.1541 10.0787H7.43711V9.1353H12.1541V10.0787Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
