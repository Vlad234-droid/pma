import React from 'react';
import { render, screen } from 'styles/test-theme-provider';
import '@testing-library/jest-dom/extend-expect';

import Avatar from './Avatar';

it('render Avatar with image', async () => {
  render(<Avatar img='/test.svg' />);
  const ava = screen.getByRole('img');
  expect(ava).toHaveAttribute('src', '/test.svg');
});

it('render Avatar without image', async () => {
  render(<Avatar />);
  expect(screen.getByText('account')).toBeInTheDocument();
});
