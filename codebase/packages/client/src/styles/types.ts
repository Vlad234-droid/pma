import { StyleProps } from 'react-fela';

import { CSSObject, IRenderer } from 'fela';

import { theme } from './';

type TypeOfValues<T extends unknown> = T[keyof T];
type StringsToKeys<S extends string> = { [K in S]?: CSSObject };

export type Theme = typeof theme;

export type Font = keyof Theme['font'];
export type Color = keyof typeof theme.colors;
export type ColorValues = TypeOfValues<typeof theme.colors>;
export type BreakpointNames = keyof typeof theme.breakpoints;

type BreakpointsMinimum = TypeOfValues<typeof theme.breakpoints>['mediaMinimum'];

export type Styles = CSSObject | StringsToKeys<BreakpointsMinimum>;
export type StylesFunction<P> = (stylesProps: StyleProps<Theme, P>) => Styles;

export type RenderFontParams = Parameters<IRenderer['renderFont']>;

export type Rule<P = {}> = StylesFunction<P> | Styles;
export type CreateRule<P = unknown> = (props?: P) => Rule<P>;

export type LengthUnit = 'px' | '%' | 'vw' | 'vh' | 'em' | 'rem';
