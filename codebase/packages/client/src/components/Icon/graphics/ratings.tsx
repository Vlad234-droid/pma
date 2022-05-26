import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const Ratings: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        id='ratings'
        stroke='null'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 0H7.35135V1.72973H1.72973V21.6216H7.35135V23.3514H0V0ZM30.2703 1.72973H24.6486V0H32V23.3514H24.6486V21.6216H30.2703V1.72973ZM7.4955 5.90991V17.4414H5.76577V5.90991H7.4955ZM19.9885 5.90991V17.4414H18.2587V5.90991H19.9885ZM12.0115 16V7.35135H13.7413V16H12.0115ZM24.5045 16V7.35135H26.2342V16H24.5045Z'
        fill={stroke}
      />
    </>
  );
};
