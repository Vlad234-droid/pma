import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Layout from './Layout';
import { renderWithTheme } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';

it('Layout', async () => {
  const { getByText } = renderWithTheme(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>,
  );
  const wrapper = getByText(/not_have_access_to_this_system/i);

  expect(wrapper).toBeInTheDocument();
});
