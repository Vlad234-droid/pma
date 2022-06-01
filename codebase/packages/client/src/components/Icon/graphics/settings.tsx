import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';
import { FCGraphicProps } from './types';

export const Settings: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8 10.6C9.43594 10.6 10.6 9.43594 10.6 8C10.6 6.56406 9.43594 5.4 8 5.4C6.56406 5.4 5.4 6.56406 5.4 8C5.4 9.43594 6.56406 10.6 8 10.6ZM8 12C9.97034 12 11.6079 10.5754 11.939 8.7H22V7.3H11.939C11.6079 5.42462 9.97034 4 8 4C6.02966 4 4.39206 5.42462 4.06104 7.3H2V8.7H4.06104C4.39206 10.5754 6.02966 12 8 12ZM16 18.6C17.4359 18.6 18.6 17.4359 18.6 16C18.6 14.5641 17.4359 13.4 16 13.4C14.5641 13.4 13.4 14.5641 13.4 16C13.4 17.4359 14.5641 18.6 16 18.6ZM16 20C17.9703 20 19.608 18.5754 19.939 16.7L19.939 16.7H22V15.3H19.939C19.6079 13.4246 17.9703 12 16 12C14.0297 12 12.3921 13.4246 12.061 15.3H2V16.7H12.061C12.3921 18.5754 14.0297 20 16 20Z'
      fill={color}
    />
  );
};
