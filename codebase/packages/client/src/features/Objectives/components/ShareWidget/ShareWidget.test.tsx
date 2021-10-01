import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen, fireEvent } from '@testing-library/react';
import ShareWidget, { TEST_ID } from './ShareWidget';

describe('ShareWidget', () => {
  const testHandler = jest.fn();

  it('should render ShareWidget', async () => {
    renderWithTheme(<ShareWidget onClick={testHandler} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('while click', async () => {
    const { getByRole } = renderWithTheme(<ShareWidget onClick={testHandler} />);
    const btn = getByRole('button');

    fireEvent.click(btn);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
