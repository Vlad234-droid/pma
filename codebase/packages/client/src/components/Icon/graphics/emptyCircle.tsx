import React from 'react';
import { colors } from '@pma/dex-wrapper';

import { FCGraphicProps } from './types';

export const EmptyCircle: FCGraphicProps = ({ color = 'tescoBlue' }) => {
  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.4 12C3.4 16.7496 7.25035 20.6 12 20.6C16.7496 20.6 20.6 16.7496 20.6 12C20.6 7.25035 16.7496 3.4 12 3.4C7.25035 3.4 3.4 7.25035 3.4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z'
      fill={colors[color]}
    />
  );
};
