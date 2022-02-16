import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Layout, { TEST_ID } from './Layout';
import { renderWithTheme } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';

it('Layout', async () => {
  const { getByTestId } = renderWithTheme(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>,
  );
  const wrapper = getByTestId(TEST_ID);

  expect(wrapper).toBeInTheDocument();
});
