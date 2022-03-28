import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { Text } from './Text';

it('render item with placeholder', async () => {
  render(<Text value={'test_value'} />);

  const text = screen.getByText(/test_value/i);

  expect(text).toBeInTheDocument();
});
