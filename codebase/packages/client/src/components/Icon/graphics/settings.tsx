import React from 'react';

import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Settings: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='settings'
        fill={stroke}
        d='M6 6.6C7.43594 6.6 8.6 5.43594 8.6 4C8.6 2.56406 7.43594 1.4 6 1.4C4.56406 1.4 3.4 2.56406 3.4 4C3.4 5.43594 4.56406 6.6 6 6.6ZM6 8C7.97034 8 9.60794 6.57538 9.93896 4.7H20V3.3H9.93896C9.60794 1.42462 7.97034 0 6 0C4.02966 0 2.39206 1.42462 2.06104 3.3H0V4.7H2.06104C2.39206 6.57538 4.02966 8 6 8ZM14 14.6C15.4359 14.6 16.6 13.4359 16.6 12C16.6 10.5641 15.4359 9.4 14 9.4C12.5641 9.4 11.4 10.5641 11.4 12C11.4 13.4359 12.5641 14.6 14 14.6ZM14 16C15.9703 16 17.608 14.5754 17.939 12.7L17.939 12.7H20V11.3H17.939C17.6079 9.42462 15.9703 8 14 8C12.0297 8 10.3921 9.42462 10.061 11.3H0V12.7H10.061C10.3921 14.5754 12.0297 16 14 16Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
