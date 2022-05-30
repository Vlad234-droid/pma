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

  it('Render wrapper', async () => {
    expect(wrapper.getByTestId('tile-wrapper')).toBeInTheDocument();
  });

  it('Tile render children', async () => {
    const tail = wrapper.queryByText('test');
    expect(tail).toBeInTheDocument();
  });
});
