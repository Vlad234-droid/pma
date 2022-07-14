import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import BaseWidget, { TEST_ID } from './BaseWidget';

describe('SecondaryWidget', () => {
  const testHandler = jest.fn();
  const testTitle = 'test title';

  it('should render SecondaryWidget', async () => {
    const { queryByTestId } = renderWithTheme(
      <BaseWidget iconGraphic='account' title={testTitle} date='Last updated Apr 2021' onClick={testHandler} />,
    );
    const widget = queryByTestId(TEST_ID);
    expect(widget).toBeInTheDocument();
    expect(widget).toHaveTextContent(testTitle);
  });

  it('while click', async () => {
    const { queryByTestId } = renderWithTheme(
      <BaseWidget iconGraphic='account' title={testTitle} date='Last updated Apr 2021' onClick={testHandler} />,
    );
    const widget = queryByTestId(TEST_ID) as HTMLElement;
    fireEvent.click(widget);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
