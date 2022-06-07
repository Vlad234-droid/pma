import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { RenderResultWithProps, renderWithTheme } from 'utils/test';
import { TileWrapper, TileWrapperProps, TILE_WRAPPER } from './TileWrapper';

describe('Tile/TileWrapper', () => {
  let wrapper: RenderResultWithProps<TileWrapperProps>;
  beforeEach(() => {
    wrapper = renderWithTheme(
      <TileWrapper>
        <div>test</div>
      </TileWrapper>,
    );
  });

  it('Render wrapper', async () => {
    expect(wrapper.getByTestId(TILE_WRAPPER)).toBeInTheDocument();
  });

  it('Tile render children', async () => {
    const tail = wrapper.queryByText('test');
    expect(tail).toBeInTheDocument();
  });
});
