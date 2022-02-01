import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import SecondaryWidget, { TEST_ID } from './SecondaryWidget';

describe('SecondaryWidget', () => {
  const testHandler = jest.fn();
  const testTitle = 'test title';

  it('should render SecondaryWidget', async () => {
    const { queryByTestId } = renderWithTheme(
      <SecondaryWidget iconGraphic='account' title={testTitle} date='Last updated Apr 2021' onClick={testHandler} />,
    );
    const widget = queryByTestId(TEST_ID);
    expect(widget).toBeInTheDocument();
    expect(widget).toHaveTextContent(testTitle);
  });

  it('while click', async () => {
    const { queryByTestId } = renderWithTheme(
      <SecondaryWidget iconGraphic='account' title={testTitle} date='Last updated Apr 2021' onClick={testHandler} />,
    );
    const widget = queryByTestId(TEST_ID);
    fireEvent.click(widget);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
