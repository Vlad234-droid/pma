import { FC } from 'react';

import { Theme } from '@dex-ddl/core';

type GraphicProps = {
  invertColors: boolean;
};

export type FCGraphicProps = FC<GraphicProps>;

export type IconColors = Theme['colors']['link'] | Theme['colors']['white'] | 'currentColor';
