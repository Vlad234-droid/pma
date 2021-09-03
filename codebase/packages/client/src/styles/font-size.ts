export const fontSizes = [12, 14, 16, 20, 24, 28, 32] as const;
export type FontSize = typeof fontSizes[number];

type TypographyValue = {
  fontSize: string;
  lineHeight: string;
};

export const typography = fontSizes.reduce((acc, font) => {
  acc[font] = {
    fontSize: `${font}px`,
    lineHeight: `${font + 4}px`,
  };
  return acc;
}, {} as Record<FontSize, TypographyValue>);

const base = {
  min: 10, //px will fallback on width 769
  max: 14, //px will fallback on width 1076
  default: 1.3, //vw will smoothly change between max and min values
};
const modularScale = 1.2;

export const fluidTypography = fontSizes.reduce((acc, font, index) => {
  const min = base.min * modularScale ** index;
  const max = base.max * modularScale ** index;
  const def = base.default * modularScale ** index;

  acc[font] = {
    fontSize: `clamp(${min.toFixed(2)}px, ${def.toFixed(2)}vw, ${max.toFixed(2)}px)`,
    lineHeight: '1.5',
  };

  return acc;
}, {} as Record<FontSize, TypographyValue>);
