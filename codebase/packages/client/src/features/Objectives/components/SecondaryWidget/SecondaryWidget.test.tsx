import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from 'styles/test-theme-provider';
import SecondaryWidget, { TEST_ID } from './SecondaryWidget';

describe('SecondaryWidget', () => {
  const testHandler = jest.fn();
  const testTitle = 'test title';

  it('should render SecondaryWidget', async () => {
    const { queryByTestId } = render(
      <SecondaryWidget iconGraphic='account' title={testTitle} date='Last updated Apr 2021' onClick={testHandler} />,
    );
    const widget = queryByTestId(TEST_ID);
    expect(widget).toBeInTheDocument();
    expect(widget).toHaveTextContent(testTitle);
  });

  it('while click', async () => {
    const { queryByTestId } = render(
      <SecondaryWidget iconGraphic='account' title={testTitle} date='Last updated Apr 2021' onClick={testHandler} />,
    );
    const widget = queryByTestId(TEST_ID);
    fireEvent.click(widget);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
