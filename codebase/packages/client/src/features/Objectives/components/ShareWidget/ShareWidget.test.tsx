import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import ShareWidget, { TEST_ID } from './ShareWidget';

describe('ShareWidget', () => {
  const testHandler = jest.fn();

  it('should render ShareWidget', async () => {
    renderWithTheme(<ShareWidget onBtnClick={testHandler} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
