import React from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { invertColor } from 'components/Icon/utils';
import { FCGraphicProps } from 'components/Icon/graphics/types';

export const Bell: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);
  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 22.5C13.0907 22.5 13.9464 21.654 13.9976 20.6C14.0003 20.5448 13.9549 20.5 13.8996 20.5C12.4477 20.5 11.5523 20.5 10.1004 20.5C10.0451 20.5 9.99975 20.5448 10.0024 20.6C10.053 21.654 10.8994 22.5 12 22.5ZM18.6376 15.9872C18.4392 15.788 18.3282 15.521 18.3282 15.243V10.9474C18.3282 7.85475 16.744 5.24416 13.964 4.398C13.7424 4.33054 13.582 4.13117 13.582 3.8995V3.57895C13.582 2.70526 12.8754 2 12 2C11.1246 2 10.418 2.70526 10.418 3.57895V3.89918C10.418 4.131 10.2574 4.33047 10.0356 4.39769C7.24661 5.24279 5.67182 7.84438 5.67182 10.9474V15.243C5.67182 15.521 5.56079 15.788 5.3624 15.9872L4.3116 17.0421C3.63831 17.718 4.1281 18.853 5.09307 18.853H18.9069C19.8719 18.853 20.3617 17.718 19.6884 17.0421L18.6376 15.9872Z'
      stroke={color}
      strokeWidth='1.1'
    />
  );
};
