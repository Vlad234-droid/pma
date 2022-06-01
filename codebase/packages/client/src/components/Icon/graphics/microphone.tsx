import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Microphone: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.13208 7.75472C7.13208 5.21356 9.21356 3.13208 11.7547 3.13208C14.2959 3.13208 16.3774 5.21356 16.3774 7.75472V11.5283C16.3774 14.0695 14.2959 16.1509 11.7547 16.1509C9.21356 16.1509 7.13208 14.0695 7.13208 11.5283V7.75472ZM11.7547 2C8.58833 2 6 4.58833 6 7.75472V11.5283C6 14.5038 8.2856 16.9688 11.1887 17.2552V20.8679H7.98113V22H15.5283V20.8679H12.3208V17.2552C15.2238 16.9688 17.5094 14.5038 17.5094 11.5283V7.75472C17.5094 4.58833 14.9211 2 11.7547 2ZM8.92453 8.32076H14.5849V7.18868H8.92453V8.32076ZM14.5849 12.0943H8.92453V10.9623H14.5849V12.0943Z'
      fill={color}
    />
  );
};
