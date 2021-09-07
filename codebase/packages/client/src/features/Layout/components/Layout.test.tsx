import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Layout, { TEST_ID } from './Layout';
import { renderWithTheme } from 'utils/test';

it('Layout', async () => {
  const { getByTestId } = renderWithTheme(<Layout />);
  const wrapper = getByTestId(TEST_ID);

  expect(wrapper).toBeInTheDocument();
});
