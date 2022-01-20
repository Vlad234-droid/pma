import React from 'react';
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { DurationPicker } from './DurationPicker';

it('render item', async () => {
  render(<DurationPicker name='test name' control='test control' />);
  expect(screen.queryByText('test name')).not.toBeInTheDocument();
});
