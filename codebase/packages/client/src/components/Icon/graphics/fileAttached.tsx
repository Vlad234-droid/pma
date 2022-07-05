import React from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { invertColor } from 'components/Icon/utils';
import { FCGraphicProps } from 'components/Icon/graphics/types';

export const FileAttached: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);
  return (
    <>
      <path
        d='M 15 2 L 6 2 C 4.902344 2 4 2.898438 4 4 L 4 20 C 4 21.101562 4.902344 22 6 22 L 18 22 C 19.101562 22 20 21.101562 20 20 L 20 7 Z M 6 20 L 6 4 L 14 4 L 14 8 L 18 8 L 18 20 Z M 16 10 L 16 15 C 16 17.210938 14.210938 19 12 19 C 9.789062 19 8 17.210938 8 15 L 8 8.5 C 8 7.03125 9.261719 5.859375 10.761719 6.011719 C 12.0625 6.140625 13 7.328125 13 8.640625 L 13 15 L 11 15 L 11 8.5 C 11 8.21875 10.78125 8 10.5 8 C 10.222656 8 10 8.21875 10 8.5 L 10 15 C 10 16.101562 10.902344 17 12 17 C 13.101562 17 14 16.101562 14 15 L 14 10 Z M 16 10 '
        fill={color}
      />
    </>
  );
};
