import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const ChatSq: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path d='M16.9505 8.1171H7.04951V6.93314H16.9505V8.1171Z' fill={color} />
      <path d='M16.9505 13.0502H7.04951V11.8663H16.9505V13.0502Z' fill={color} />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 2V17.9834H6.9505V22L7.61076 21.9262C9.86292 21.6745 11.7476 20.043 12.0551 17.9834H22V2H2ZM3.18812 16.7994V3.18395H20.8119V16.7994H10.9109V17.3914C10.9109 18.8205 9.77657 20.1775 8.13861 20.6239V16.7994H3.18812Z'
        fill={color}
      />
    </>
  );
};
