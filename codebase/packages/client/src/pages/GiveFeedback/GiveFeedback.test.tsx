import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import GiveFeedback from './GiveFeedback';
import { renderWithTheme } from '../../utils/test';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';

it('FeedBack', async () => {
  const { getByTestId } = renderWithTheme(
    <BrowserRouter>
      <GiveFeedback />
    </BrowserRouter>,
  );
  const timeline = getByTestId('give-feedback');

  expect(timeline).toBeInTheDocument();
});
