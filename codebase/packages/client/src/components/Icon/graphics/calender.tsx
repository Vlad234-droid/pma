import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const Calender: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const stroke = invertColor(theme.colors.link, invertColors, theme);

  return (
    <>
      <path
        stroke='null'
        id='calender'
        fill={stroke}
        d='M6.95049 6.97468V5.0845H3.18812V8.86506H20.8119V5.0845H17.0495V6.97468H15.8614V5.0845H8.13861V6.97468H6.95049ZM15.8614 3.89058H8.13861V2H6.95049V3.89058H2.59406H2V4.48754V21.4015V22L2.59562 21.9984L21.4075 21.9487L22 21.9471V21.3517V4.48754V3.89058H21.4059H17.0495V2H15.8614V3.89058ZM3.18812 10.059V20.8029L20.8119 20.7563V10.059H3.18812Z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </>
  );
};
