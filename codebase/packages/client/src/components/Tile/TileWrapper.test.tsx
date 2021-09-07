import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { RenderResultWithProps, renderWithTheme } from 'utils/test';
import { TileWrapper, TileWrapperProps } from './TileWrapper';

describe('Tile/TileWrapper', () => {
  let wrapper: RenderResultWithProps<TileWrapperProps>;
  beforeEach(() => {
    wrapper = renderWithTheme(
      <TileWrapper>
        <div>test</div>
      </TileWrapper>,
    );
  });

  it('Tile has border', async () => {
    const tail = wrapper.queryByText('test');
    expect(tail).toBeInTheDocument();
  });
});
