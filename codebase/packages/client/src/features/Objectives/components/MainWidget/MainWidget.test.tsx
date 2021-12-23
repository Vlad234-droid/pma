import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen, fireEvent } from '@testing-library/react';
import MainWidget, { TEST_ID } from './MainWidget';

jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));

describe('MainWidget', () => {
  const testHandler = jest.fn();

  it('should render MainWidget', async () => {
    renderWithTheme(<MainWidget onClick={testHandler} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('while click', async () => {
    const { queryByTestId } = renderWithTheme(<MainWidget onClick={testHandler} />);
    const widget = queryByTestId(TEST_ID);

    fireEvent.click(widget);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
