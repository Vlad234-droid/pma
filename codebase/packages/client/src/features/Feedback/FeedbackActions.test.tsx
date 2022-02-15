import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import FeedbackActions from './FeedbackActions';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { INFO_360_MODAL } from './components/Info360Modal';

describe('Feedback actions', () => {
  it('render main page', async () => {
    const history = createMemoryHistory();
    history.push('/feedback');
    const { getByTestId, findByTestId, queryByTestId } = renderWithTheme(
      <BrowserRouter>
        <FeedbackActions />
      </BrowserRouter>,
    );

    const modal_360 = queryByTestId(INFO_360_MODAL);
    const infoButton = getByTestId('iconButton');
    const input = getByTestId('treatment_options');
    expect(modal_360).toBeNull();
    fireEvent.click(infoButton);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
    expect(await findByTestId(INFO_360_MODAL)).toBeInTheDocument();
  });
});
