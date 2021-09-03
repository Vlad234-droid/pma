import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Layout, { TEST_ID } from './Layout';
import { render, screen } from 'styles/test-theme-provider';

it('Layout', async () => {
  render(<Layout />);
  const wrapper = screen.queryByTestId(TEST_ID);

  expect(wrapper).toBeInTheDocument();
});
