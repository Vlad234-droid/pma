import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import Tile, { TEST_ID } from './Tile';

describe('Tile', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });
  it('should render Tile', async () => {
    renderWithTheme(<Tile img={'img'} title='Test title' description='Test description' />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
