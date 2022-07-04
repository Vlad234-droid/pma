import React from 'react';

import { FCGraphicProps } from './types';
import { colors } from '@pma/dex-wrapper';

export const RoundPencil: FCGraphicProps = ({ color = 'tescoBlue' }) => {
  return (
    <>
      <circle cx='12' cy='12' r='12' fill='white' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.4469 5.24716L18.7517 6.55216C19.3494 7.14984 19.3493 8.11717 18.7517 8.7148L18.241 9.22558L14.7736 5.75794L15.2844 5.24716C15.8806 4.65097 16.8506 4.65094 17.4469 5.24716ZM5.41909 15.396L4.80706 18.7013C4.78178 18.8379 4.82532 18.9782 4.92356 19.0764C5.02191 19.1748 5.16225 19.2182 5.29869 19.1929L8.6037 18.5809L5.41909 15.396ZM5.87432 14.658L14.177 6.35458L17.6444 9.82221L9.34167 18.1256L5.87432 14.658Z'
        fill={colors[color]}
      />
    </>
  );
};
