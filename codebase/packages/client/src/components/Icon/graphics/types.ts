import { FC } from 'react';

import { Theme, Colors } from '@pma/dex-wrapper';

type GraphicProps = {
  invertColors: boolean;
  color?: Colors;
};

export type FCGraphicProps = FC<GraphicProps>;

export type IconColors =
  | Theme['colors']['link']
  | Theme['colors']['pending']
  | Theme['colors']['white']
  | 'currentColor';
