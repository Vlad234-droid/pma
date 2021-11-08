import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import GiveFeedback from './GiveFeedback';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';

import '@testing-library/jest-dom';

it('FeedBack', async () => {
  const history = createMemoryHistory();
  history.push('/give-feedback');
  const { getByTestId } = renderWithTheme(
    <Router history={history}>
      <GiveFeedback />
    </Router>,
  );
  const timeline = getByTestId('give-feedback');

  expect(timeline).toBeInTheDocument();
});
