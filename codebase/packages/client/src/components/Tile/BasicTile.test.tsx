import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { RenderResultWithProps, renderWithTheme } from 'utils/test';
import { BasicTile, TEST_ICON, TEST_ID, TileProps } from './BasicTile';
import { fireEvent } from '@testing-library/react';

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

  it('Tile should render event text', async () => {
    wrapper = renderWithTheme(<BasicTile title='test' description='desc' event='test event' />);
    expect(wrapper.getByText('test event')).toBeInTheDocument();
  });

  it('Render wrapper', async () => {
    wrapper = renderWithTheme(<BasicTile title='test' description='desc' event='test event' />);
    expect(wrapper.getByTestId('tile-wrapper')).toBeInTheDocument();
  });

  it('Render event Icon', async () => {
    wrapper = renderWithTheme(
      <BasicTile title='test' description='desc' event='test event'>
        <div>Test</div>
      </BasicTile>,
    );
    expect(wrapper.getByTestId(TEST_ICON)).toBeInTheDocument();
  });
});
