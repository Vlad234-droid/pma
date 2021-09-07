import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';
import { BasicTile } from './BasicTile';

it('Tile has image', async () => {
  render(<BasicTile img='/test.svg' title='test' description='desc' />);
  const tail = screen.getByRole('img');
  expect(tail).toHaveAttribute('src', '/test.svg');
  expect(screen.getByText('test')).toBeInTheDocument();
  expect(screen.getByText('desc')).toBeInTheDocument();
});

it('Tile does not has image', async () => {
  render(<BasicTile title='test' description='desc' />);
  const tail = screen.queryByRole('img');
  expect(tail).not.toBeInTheDocument();
  expect(screen.getByText('test')).toBeInTheDocument();
  expect(screen.getByText('desc')).toBeInTheDocument();
});
