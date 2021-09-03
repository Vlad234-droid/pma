import { Theme } from 'styles';

import { IconColors } from './graphics/types';

export const invertColor = (color: IconColors, shouldInvert: boolean, { colors: { white, link } }: Theme) => {
  if (!shouldInvert) return color;

  if (color === white) {
    return link;
  }
  return white;
};

export const getId = (str: string): string => {
  return str.toLowerCase().replace(/ /g, '');
};

export const getTitle = (str: string): string => {
  return str.split(/(?=[A-Z])/).join(' ');
};
