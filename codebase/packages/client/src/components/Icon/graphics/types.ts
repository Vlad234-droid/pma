import { ColorValues, Theme } from 'styles';

export type GraphicProps = {
  invertColors: boolean;
};

export type IconColors = Extract<ColorValues, Theme['colors']['link'] | Theme['colors']['white']> | 'currentColor';
