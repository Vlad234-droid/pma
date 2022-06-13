import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import List, { TEST_ID } from './List';

describe('List', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });
  it('should render List', async () => {
    renderWithTheme(<List data={[]} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
