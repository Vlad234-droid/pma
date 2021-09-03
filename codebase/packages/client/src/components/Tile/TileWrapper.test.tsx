import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from 'styles/test-theme-provider';
import TileWrapper from './TileWrapper';

it('Tile has border', async () => {
  render(
    <TileWrapper>
      <div>test</div>
    </TileWrapper>,
  );
  const tail = screen.queryByText('test');
  expect(tail).toBeInTheDocument();
});
