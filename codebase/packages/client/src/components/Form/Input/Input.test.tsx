import React from 'react';
import { render, screen } from 'styles/test-theme-provider';
import '@testing-library/jest-dom/extend-expect';

import { Input } from '../Input';

it('render item with placeholder', async () => {
  render(<Input placeholder='this is a placeholder' />);

  const placeholder = screen.queryByPlaceholderText(/this is a placeholder/i);

  expect(placeholder).toBeInTheDocument();
});

it('render item without placeholder', async () => {
  render(<Input />);

  const placeholder = screen.queryByPlaceholderText(/[.+]/);

  expect(placeholder).not.toBeInTheDocument();
});
