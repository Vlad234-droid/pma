import React, { FC } from 'react';

import { GraphicProps } from './types';

export const RoundClock: FC<GraphicProps> = () => {
  return (
    <path
      stroke='null'
      fill='#FF700A'
      d='m12.06378,23.8252c6.49607,0 11.76142,-5.26535 11.76142,-11.76142c0,-6.49602 -5.26535,-11.76142 -11.76142,-11.76142c-6.49602,0 -11.76142,5.2654 -11.76142,11.76142c0,6.49607 5.2654,11.76142 11.76142,11.76142zm-0.74285,-19.80871l0,7.92344l-5.44737,0l0,1.4857l6.19022,0l0.74285,0l0,-0.74285l0,-8.6663l-1.4857,0z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  );
};
