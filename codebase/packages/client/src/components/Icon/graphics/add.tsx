import React from 'react';

import { useStyle } from '@dex-ddl/core';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Add: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();
  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='add'
        fill={stroke}
        d='M12 20.8C16.8601 20.8 20.8 16.8601 20.8 12C20.8 7.13989 16.8601 3.2 12 3.2C7.13989 3.2 3.2 7.13989 3.2 12C3.2 16.8601 7.13989 20.8 12 20.8ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM11.5 12.5H8.35416V11.5H11.5V8.35416H12.5V11.5H15.6458V12.5H12.5V15.6458H11.5V12.5Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
