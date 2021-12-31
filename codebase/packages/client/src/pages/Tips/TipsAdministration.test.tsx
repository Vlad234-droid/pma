import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import TipsAdministration from './TipsAdministration';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';

import '@testing-library/jest-dom';
// jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));

it('TipsAdministration', async () => {
  const history = createMemoryHistory();
  history.push('/tips');
  const { getByTestId } = renderWithTheme(
    <Router history={history}>
      <TipsAdministration />
    </Router>,
  );
  const timeline = getByTestId('tips-administration');

  expect(timeline).toBeInTheDocument();
});
