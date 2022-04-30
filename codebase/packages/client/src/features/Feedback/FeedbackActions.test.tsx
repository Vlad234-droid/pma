import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import FeedbackActions, { FEEDBACK_ACTIONS } from './FeedbackActions';
import { renderWithTheme } from 'utils/test';

describe('Feedback actions', () => {
  it('it should render feedback action page', async () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.FEEDBACK));
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <FeedbackActions />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(FEEDBACK_ACTIONS);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should render dropdown', async () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.FEEDBACK));
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <FeedbackActions />
      </BrowserRouter>,
    );

    const dropdown = getByTestId('select-treatment-options-wrapper');
    expect(dropdown).toBeInTheDocument();
  });
});
