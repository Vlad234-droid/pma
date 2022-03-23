// @ts-ignore
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';

import { default as ReviewHelpModal, TEST_ID } from './ReviewHelpModal';

describe('ReviewHelpModal', () => {
  it('render ObjectiveHelpModal', async () => {
    render(<ReviewHelpModal />);

    const component = screen.getByTestId(TEST_ID);

    expect(component).toBeInTheDocument();
  });
});
