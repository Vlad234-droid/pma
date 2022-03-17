import React from 'react';
import { useStyle } from '@dex-ddl/core';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Attention: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.pending, invertColors, theme);

  return (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM10.84 13.8122H12.568L13.016 6.4842H10.392L10.84 13.8122ZM10.76 15.5242C10.504 15.7802 10.376 16.0949 10.376 16.4682C10.376 16.8309 10.504 17.1402 10.76 17.3962C11.016 17.6522 11.3307 17.7802 11.704 17.7802C12.0773 17.7802 12.392 17.6522 12.648 17.3962C12.904 17.1402 13.032 16.8309 13.032 16.4682C13.032 16.0949 12.8987 15.7802 12.632 15.5242C12.376 15.2575 12.0667 15.1242 11.704 15.1242C11.3413 15.1242 11.0267 15.2575 10.76 15.5242Z'
        fill={stroke}
      />
    </>
  );
};
