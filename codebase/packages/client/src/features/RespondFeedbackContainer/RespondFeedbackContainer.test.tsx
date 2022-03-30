import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RespondFeedbackContainer, { RESPOND_FEEDBACK_CONTAINER } from './RespondFeedbackContainer';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

describe('RespondFeedbackContainer', () => {
  it('RespondFeedbackContainer', async () => {
    const history = createMemoryHistory();
    history.push('/respond-feedback');
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <RespondFeedbackContainer />
      </BrowserRouter>,
    );
    const mainRespondPage = getByTestId(RESPOND_FEEDBACK_CONTAINER);
    expect(mainRespondPage).toBeInTheDocument();
  });

  it('check box click', () => {
    const history = createMemoryHistory();
    history.push('/respond-feedback');
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <RespondFeedbackContainer />
      </BrowserRouter>,
    );
    const radio = getByTestId('completed');
    expect(radio).toBeInTheDocument();
    expect(radio).not.toBeChecked();
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });
});
