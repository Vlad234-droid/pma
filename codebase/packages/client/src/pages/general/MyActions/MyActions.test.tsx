import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import MyActions from './MyActions';

it('render MyActions page', async () => {
  render(<MyActions />);

  const text = screen.getByTestId('MyActions');

  expect(text).toBeInTheDocument();
});
