import React from 'react';
import { colors } from '@pma/dex-wrapper';

import { FCGraphicProps } from './types';

export const RoundTick: FCGraphicProps = ({ color = 'green' }) => {
  return (
    <path
      stroke='null'
      fill={colors[color]}
      d='m11.95783,23.91566c6.60455,0 11.95783,-5.35328 11.95783,-11.95783c0,-6.6045 -5.35328,-11.95783 -11.95783,-11.95783c-6.6045,0 -11.95783,5.35333 -11.95783,11.95783c0,6.60455 5.35333,11.95783 11.95783,11.95783zm-1.94956,-7.40405l9.09077,-7.9719l-0.99597,-1.13565l-8.59275,7.53521l-3.69778,-3.24266l-0.99588,1.13569l4.19573,3.6793l0.49794,0.4367l0.49795,-0.4367z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  );
};
