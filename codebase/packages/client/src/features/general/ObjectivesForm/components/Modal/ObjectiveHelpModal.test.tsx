import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { default as ObjectiveHelpModal, TEST_ID } from './ObjectiveHelpModal';

it('render ObjectiveHelpModal', async () => {
  render(<ObjectiveHelpModal />);

  const component = screen.getByTestId(TEST_ID);

  expect(component).toBeInTheDocument();
});
