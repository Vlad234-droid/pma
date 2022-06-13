import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import MyTeam, { TEST_ID } from './MyTeam';

it('render MyTeam page', async () => {
  render(
    <BrowserRouter>
      <MyTeam />
    </BrowserRouter>,
  );

  const text = screen.getByTestId(TEST_ID);

  expect(text).toBeInTheDocument();
});
