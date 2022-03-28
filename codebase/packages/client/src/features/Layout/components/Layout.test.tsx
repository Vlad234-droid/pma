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
  const wrapper = getByText(/raise_a_ticket_to_access/i);

  expect(wrapper).toBeInTheDocument();
});
