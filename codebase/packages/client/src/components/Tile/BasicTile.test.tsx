import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { RenderResultWithProps, renderWithTheme } from 'utils/test';
import { BasicTile, TileProps } from './BasicTile';

describe('Tile/BasicTile', () => {
  let wrapper: RenderResultWithProps<TileProps>;

  it('Tile has image', async () => {
    wrapper = renderWithTheme(<BasicTile img='/test.svg' title='test' description='desc' />);
    const tail = wrapper.getByRole('img');
    expect(tail).toHaveAttribute('src', '/test.svg');
    expect(wrapper.getByText('test')).toBeInTheDocument();
    expect(wrapper.getByText('desc')).toBeInTheDocument();
  });

  it('Tile does not has image', async () => {
    wrapper = renderWithTheme(<BasicTile title='test' description='desc' />);
    const tail = wrapper.queryByRole('img');
    expect(tail).not.toBeInTheDocument();
    expect(wrapper.getByText('test')).toBeInTheDocument();
    expect(wrapper.getByText('desc')).toBeInTheDocument();
  });
});
