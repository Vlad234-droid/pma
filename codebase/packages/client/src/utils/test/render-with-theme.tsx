import React, { cloneElement, FC, ReactElement } from 'react';
import { I18nextProvider } from './mocks/react-i18next';
import i18n from './mocks/i18';

import { render, RenderResult, screen as screenTestingLibrary, Screen } from '@testing-library/react';

import { DDLProvider } from '@dex-ddl/core';

const App: FC = (props) => <DDLProvider {...props} />;

export type RenderResultWithProps<TProps> = RenderResult & {
  rerenderWithProps: (props: Partial<TProps>) => void;
};

export const renderWithTheme = <TProps extends {} = {}>(
  component: ReactElement<TProps>,
): RenderResultWithProps<TProps> => {
  const wrapper = render(
    <I18nextProvider i18n={i18n}>
      <App>{component}</App>
    </I18nextProvider>,
  );

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
