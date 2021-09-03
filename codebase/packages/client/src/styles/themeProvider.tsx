import React, { FC } from 'react';

import {
  FelaComponent,
  FelaComponentProps,
  RendererProvider,
  ThemeProvider as FelaThemeProvider,
  useFela,
} from 'react-fela';

import { createRenderer, IRenderer } from 'fela';

import { useMedia } from './use-media';

import { BreakpointsProvider, RenderFontParams, Theme, Rule, theme, BreakpointNames } from './';

// it's worth keeping this around just in case, but we should  avoid using this
// style of theming components
export const ThemedFC = <P extends FelaComponentProps<Theme, P>>(props: P) => <FelaComponent {...props} />;

export interface UseStyle<P> {
  css: (...styles: (Rule<P> | Array<Rule<P>>)[]) => string;
  theme: Theme;
  renderer: IRenderer;
  matchMedia: ReturnType<typeof useMedia>['matchMedia'];
}

export const useStyle = <P extends unknown>(props?: P): UseStyle<P> => ({
  ...useFela<Theme, P>(props),
  ...useMedia(),
});

export const ThemeProvider: FC<{ renderer: IRenderer }> = ({ children, renderer }) => {
  const breakpoints = Object.entries(theme.breakpoints).reduce<Record<BreakpointNames, number>>(
    (acc, [breakpointName, { media }]) => ({
      ...acc,
      [breakpointName]: media,
    }),
    {} as Record<BreakpointNames, number>,
  );

  return (
    <RendererProvider renderer={renderer}>
      <FelaThemeProvider theme={theme}>
        <BreakpointsProvider value={breakpoints}>{children}</BreakpointsProvider>
      </FelaThemeProvider>
    </RendererProvider>
  );
};

export const makeRenderer = (fonts: RenderFontParams[] = []) => {
  const renderer = createRenderer();

  fonts.forEach((params) => renderer.renderFont(...params));

  return renderer;
};
