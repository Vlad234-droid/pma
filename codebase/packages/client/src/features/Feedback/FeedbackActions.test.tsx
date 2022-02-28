import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import FeedbackActions from './FeedbackActions';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { INFO_360_MODAL } from './components/Info360Modal';
import { FEEDBACK_ACTIONS } from './FeedbackActions';

describe('Feedback actions', () => {
  it('render main page', async () => {
    const history = createMemoryHistory();
    history.push('/feedback');
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <FeedbackActions />
      </BrowserRouter>,
    );

    const wrapper = getByTestId(FEEDBACK_ACTIONS);
    const dropdown = getByTestId('treatment-options-wrapper');
    expect(dropdown).toBeInTheDocument();
    expect(wrapper).toBeInTheDocument();
  });
});
