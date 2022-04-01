import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Account: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        id='account'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.87082 6.42401C8.87082 4.69581 10.2718 3.29483 12 3.29483C13.7282 3.29483 15.1292 4.69581 15.1292 6.42401C15.1292 8.15222 13.7282 9.5532 12 9.5532C10.2718 9.5532 8.87082 8.15222 8.87082 6.42401ZM12 2C9.55668 2 7.57599 3.9807 7.57599 6.42401C7.57599 8.86733 9.55668 10.848 12 10.848C14.4433 10.848 16.424 8.86733 16.424 6.42401C16.424 3.9807 14.4433 2 12 2ZM12 14.0851C15.6529 14.0851 19.0347 16.6244 20.3066 20.3435H3.69342C4.96526 16.6244 8.34712 14.0851 12 14.0851ZM12 12.7903C7.44221 12.7903 3.36369 16.1581 2.20001 20.8346L2 21.6383H2.82826H21.1717H22L21.8 20.8346C20.6363 16.1581 16.5578 12.7903 12 12.7903Z'
        fill={stroke}
      />
    </>
  );
};
