import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const ChatSq: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path d='M14.9505 6.1171H5.04951V4.93314H14.9505V6.1171Z' fill={stroke} />
      <path d='M14.9505 11.0502H5.04951V9.86629H14.9505V11.0502Z' fill={stroke} />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 0V15.9834H4.9505V20L5.61076 19.9262C7.86292 19.6745 9.74759 18.043 10.0551 15.9834H20V0H0ZM1.18812 14.7994V1.18395H18.8119V14.7994H8.91089V15.3914C8.91089 16.8205 7.77657 18.1775 6.13861 18.6239V14.7994H1.18812Z'
        fill={stroke}
      />
    </>
  );
};
