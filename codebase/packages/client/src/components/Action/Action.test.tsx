// @ts-ignore
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';

import Action, { TEST_ID, ICON_TEST_ID, ITEMS_TEST_ID } from './Action';

describe('Action', () => {
  it('Action render correctly', () => {
    const { getByTestId } = render(<Action items={[]} />);
    const action = getByTestId(TEST_ID);
    expect(action).toBeInTheDocument();
  });

  it('Action items render correctly', () => {
    const { getByTestId } = render(<Action items={[]} />);
    const icon = getByTestId(ICON_TEST_ID);
    fireEvent.click(icon);
    const items = getByTestId(ITEMS_TEST_ID);
    waitFor(() => expect(items).toBeInTheDocument());
  });
});
