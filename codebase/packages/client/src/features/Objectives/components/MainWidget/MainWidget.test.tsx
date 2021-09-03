import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from 'styles/test-theme-provider';
import MainWidget, { TEST_ID } from './MainWidget';

describe('MainWidget', () => {
  const testHandler = jest.fn();

  it('should render MainWidget', async () => {
    render(<MainWidget onClick={testHandler} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('while click', async () => {
    render(<MainWidget onClick={testHandler} />);
    const widget = screen.queryByTestId(TEST_ID);

    fireEvent.click(widget);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
