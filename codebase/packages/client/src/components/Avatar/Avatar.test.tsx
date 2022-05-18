import React from 'react';
import { RenderResultWithProps, renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { Avatar, AvatarProps } from './Avatar';

let wrapper: RenderResultWithProps<AvatarProps>;

it('render Avatar with image', async () => {
  wrapper = renderWithTheme(<Avatar img='/test.svg' />);
  const ava = wrapper.getByRole('img');
  expect(ava).toHaveAttribute('src', '/test.svg');
});

it('render Avatar without image', async () => {
  wrapper = renderWithTheme(<Avatar />);
  expect(wrapper.getByTestId('test-id-account-icon')).toBeInTheDocument();
});
