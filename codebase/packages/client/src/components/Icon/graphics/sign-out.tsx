import React from 'react';

import { FCGraphicProps } from './types';
import { useStyle } from '@pma/dex-wrapper';
import { invertColor } from 'components/Icon/utils';

export const SignOut: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);
  return (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.2266 8.00922L16.9295 7.33042L22 12.0335L16.9295 16.7366L16.2266 16.0578L20.0421 12.5184L12.2606 12.5184V11.5486L20.0421 11.5486L16.2266 8.00922ZM14.0249 2.62734V2.02734H13.4249L2.6033 2.02734H2.0033V2.62734L2.0033 21.4397V22.0397H2.6033L13.4249 22.0397H14.0249V21.4397V17.0501H12.8249V20.8397L3.2033 20.8397L3.2033 3.22734L12.8249 3.22734V7.01688H14.0249V2.62734Z'
        fill={color}
      />
    </>
  );
};
