import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RespondFeedback from './RespondFeedback';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';
import UserEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RESPOND_FEEDBACK } from './RespondFeedback';

describe('RespondFeedback', () => {
  it('RespondFeedback', async () => {
    const history = createMemoryHistory();
    history.push('/respond-feedback');
    const { getByTestId } = renderWithTheme(
      <Router history={history}>
        <RespondFeedback />
      </Router>,
    );
    const respond_page = getByTestId(RESPOND_FEEDBACK);
    expect(respond_page).toBeInTheDocument();
  });
});
