import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const Rating: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 3H5.51351V4.2973H1.2973V19.2162H5.51351V20.5135H0V3ZM22.7027 4.2973H18.4865V3H24V20.5135H18.4865V19.2162H22.7027V4.2973ZM5.62162 7.43243V16.0811H4.32432V7.43243H5.62162ZM14.9914 7.43243V16.0811H13.6941V7.43243H14.9914ZM9.00865 15V8.51351H10.3059V15H9.00865ZM18.3784 15V8.51351H19.6757V15H18.3784Z'
        fill={color}
      />
    </>
  );
};
