import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Archive: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='archive'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.833984 2.64865C0.833984 2.10622 1.27371 1.6665 1.81613 1.6665H18.1852C18.7276 1.6665 19.1673 2.10622 19.1673 2.64865V5.75877C19.1673 6.30119 18.7276 6.74091 18.1852 6.74091H17.8578V17.5445C17.8578 18.0869 17.4181 18.5266 16.8757 18.5266H3.12565C2.58323 18.5266 2.14351 18.0869 2.14351 17.5445V6.74091H1.81613C1.2737 6.74091 0.833984 6.30119 0.833984 5.75877V2.64865ZM3.45303 6.74091H16.5483V17.2171H3.45303V6.74091ZM17.8578 5.43139H16.8757H3.12565H2.14351V2.97603H17.8578V5.43139ZM7.21791 9.68734C6.8563 9.68734 6.56315 9.98048 6.56315 10.3421C6.56315 10.7037 6.8563 10.9969 7.21791 10.9969H12.7834C13.145 10.9969 13.4382 10.7037 13.4382 10.3421C13.4382 9.98048 13.145 9.68734 12.7834 9.68734H7.21791Z'
        fill={stroke}
      />
    </>
  );
};
