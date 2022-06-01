import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Archive: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const fillColor = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1 3.17857C1 2.52766 1.52767 2 2.17857 2H21.8214C22.4723 2 23 2.52766 23 3.17857V6.91071C23 7.56162 22.4723 8.08929 21.8214 8.08929H21.4286V21.0536C21.4286 21.7045 20.9009 22.2321 20.25 22.2321H3.75C3.09909 22.2321 2.57143 21.7045 2.57143 21.0536V8.08929H2.17857C1.52766 8.08929 1 7.56162 1 6.91071V3.17857ZM4.14286 8.08929H19.8571V20.6607H4.14286V8.08929ZM21.4286 6.51786H20.25H3.75H2.57143V3.57143H21.4286V6.51786ZM8.66071 11.625C8.22678 11.625 7.875 11.9768 7.875 12.4107C7.875 12.8447 8.22678 13.1964 8.66071 13.1964H15.3393C15.7732 13.1964 16.125 12.8447 16.125 12.4107C16.125 11.9768 15.7732 11.625 15.3393 11.625H8.66071Z'
      fill={fillColor}
    />
  );
};
