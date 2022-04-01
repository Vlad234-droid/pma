import { FC } from 'react';

import { Theme } from '@pma/dex-wrapper';

type GraphicProps = {
  invertColors: boolean;
};

export type FCGraphicProps = FC<GraphicProps>;

export type IconColors =
  | Theme['colors']['link']
  | Theme['colors']['pending']
  | Theme['colors']['white']
  | 'currentColor';
