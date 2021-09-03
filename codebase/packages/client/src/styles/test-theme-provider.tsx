import React, { ReactElement } from 'react';

import { render, RenderResult } from '@testing-library/react';

import { getFontFamilies, makeRenderer, ThemeProvider } from './';

export function themeRender(component: ReactElement<Element>): RenderResult {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const renderer = makeRenderer(getFontFamilies());
  return render(<ThemeProvider renderer={renderer}>{component}</ThemeProvider>);
}

export * from '@testing-library/react';
export { themeRender as render };
