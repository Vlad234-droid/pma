import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Search: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='search'
        fill={stroke}
        d='M1.33154 7.87827C1.33154 4.26244 4.26244 1.33154 7.87827 1.33154C11.4941 1.33154 14.425 4.26244 14.425 7.87827C14.425 11.4941 11.4941 14.425 7.87827 14.425C4.26244 14.425 1.33154 11.4941 1.33154 7.87827ZM7.87827 0C3.52706 0 0 3.52706 0 7.87827C0 12.2295 3.52706 15.7565 7.87827 15.7565C9.81418 15.7565 11.5869 15.0584 12.9585 13.9001L19.0585 20L20 19.0585L13.9001 12.9585C15.0584 11.5869 15.7565 9.81418 15.7565 7.87827C15.7565 3.52706 12.2295 0 7.87827 0Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
