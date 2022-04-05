import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import ObjectivesView, { TEST_ID, SPINNER_ID } from './ObjectivesView';

describe('ObjectivesView', () => {
  it('should NOT render ObjectivesView', async () => {
    renderWithTheme(<ObjectivesView />);
    const view = screen.queryByTestId(TEST_ID);

    expect(view).not.toBeInTheDocument();
  });
});
