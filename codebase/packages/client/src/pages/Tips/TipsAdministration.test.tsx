import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import TipsAdministration from './TipsAdministration';
import { renderWithTheme } from '../../utils/test';

import '@testing-library/jest-dom';
// jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));

it('TipsAdministration', async () => {
  const { getByTestId } = renderWithTheme(
    <BrowserRouter>
      <TipsAdministration />
    </BrowserRouter>,
  );
  const timeline = getByTestId('tips-administration');

  expect(timeline).toBeInTheDocument();
});
