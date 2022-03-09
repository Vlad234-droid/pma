import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import NoFeedback from './NoFeedback';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Page } from 'pages';
import { buildPath } from 'features/Routes';

describe('it should render no feedback tile', () => {
  it('no feedback tile', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.FEEDBACK));
    const { getByTestId } = render(
      <BrowserRouter>
        <NoFeedback />
      </BrowserRouter>,
    );
    const wrapper = getByTestId('tile-wrapper');
    expect(wrapper).toBeInTheDocument();
  });
});
