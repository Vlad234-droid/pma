import React from 'react';
import { render, screen } from 'styles/test-theme-provider';
import '@testing-library/jest-dom/extend-expect';

import { Textarea } from '../Input';

it('render item with placeholder', async () => {
  render(<Textarea placeholder='this is a placeholder' />);

  const placeholder = screen.queryByPlaceholderText(/this is a placeholder/i);

  expect(placeholder).toBeInTheDocument();
});

it('render item without placeholder', async () => {
  render(<Textarea />);

  const placeholder = screen.queryByPlaceholderText(/[.+]/);

  expect(placeholder).not.toBeInTheDocument();
});
