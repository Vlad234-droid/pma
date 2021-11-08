import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import FeedBack from './Feedback';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';

import '@testing-library/jest-dom';

it('FeedBack', async () => {
  const history = createMemoryHistory();
  history.push('/feedback');
  const { getByTestId } = renderWithTheme(
    <Router history={history}>
      <FeedBack />
    </Router>,
  );
  const timeline = getByTestId('feed_back_page');

  expect(timeline).toBeInTheDocument();
});
