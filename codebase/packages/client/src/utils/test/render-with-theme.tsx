import React, { cloneElement, FC, ReactElement } from 'react';

import { render, RenderResult, screen as screenTestingLibrary, Screen } from '@testing-library/react';

import { DDLProvider } from '@dex-ddl/core';

const App: FC = (props) => <DDLProvider {...props} />;

export type RenderResultWithProps<TProps> = RenderResult & {
  rerenderWithProps: (props: Partial<TProps>) => void;
};

export const renderWithTheme = <TProps extends {} = {}>(
  component: ReactElement<TProps>,
): RenderResultWithProps<TProps> => {
  const wrapper = render(<App>{component}</App>);

  const rerenderWithProps = (props: Partial<TProps>) => {
    const updatedComponent = cloneElement(component, {
      ...component.props,
      ...props,
    });
    wrapper.rerender(<App>{updatedComponent}</App>);
  };

  return { ...wrapper, rerenderWithProps };
};

export const screen: Screen = screenTestingLibrary;
