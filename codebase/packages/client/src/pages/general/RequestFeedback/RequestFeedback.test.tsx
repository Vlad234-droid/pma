import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RequestFeedback from './RequestFeedback';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

it('FeedBack', async () => {
  const { getByTestId } = renderWithTheme(
    <BrowserRouter>
      <RequestFeedback />
    </BrowserRouter>,
  );
  const timeline = getByTestId('request-feedback');

  expect(timeline).toBeInTheDocument();
});
