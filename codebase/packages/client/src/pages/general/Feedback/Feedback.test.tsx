import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import FeedBack from './Feedback';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from 'utils/test';

import '@testing-library/jest-dom';

it('FeedBack', async () => {
  const { getByTestId } = renderWithTheme(
    <BrowserRouter>
      <FeedBack />
    </BrowserRouter>,
  );
  const timeline = getByTestId('feed_back_page');

  expect(timeline).toBeInTheDocument();
});
