import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const Folder: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='folder'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.16334 1.6665H0.833984V17.9628L19.1673 17.9123V5.40304L10.0902 5.40245L8.16334 1.6665ZM2.11307 2.95291H7.38497L8.65725 5.41854H2.11307V2.95291ZM2.11307 6.70495V16.6725L17.8883 16.6296V6.70495H2.11307Z'
        fill={stroke}
      />
    </>
  );
};
