import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import Attention from '../Attention';

it('render item Attention', async () => {
  render(<Attention />);

  const text = screen.getByText(/Please complete all fields/);

  expect(text).toBeInTheDocument();
});
