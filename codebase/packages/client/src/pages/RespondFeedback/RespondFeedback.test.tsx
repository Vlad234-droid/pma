import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RespondFeedback, { RESPOND_FEEDBACK } from './RespondFeedback';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';

describe('RespondFeedback', () => {
  it('RespondFeedback', async () => {
    const history = createMemoryHistory();
    history.push('/respond-feedback');
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <RespondFeedback />
      </BrowserRouter>,
    );
    const respond_page = getByTestId(RESPOND_FEEDBACK);
    expect(respond_page).toBeInTheDocument();
  });
});
