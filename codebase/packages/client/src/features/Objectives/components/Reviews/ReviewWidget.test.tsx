import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen, fireEvent } from '@testing-library/react';
import ReviewWidget, { TEST_ID } from './ReviewWidget';

describe('ReviewWidget', () => {
  const testHandler = jest.fn();

  it('should render ReviewWidget', async () => {
    renderWithTheme(<ReviewWidget reviewType={'MYR'} onClick={testHandler} title={'test'} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('while click', async () => {
    const { queryByTestId } = renderWithTheme(<ReviewWidget reviewType={'MYR'} onClick={testHandler} title={'test'} />);
    const widget = queryByTestId(TEST_ID);

    fireEvent.click(widget);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
