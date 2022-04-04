import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import InfoTable, { INFO_TABLE_WRAPPER } from './InfoTable';
import { renderWithTheme as render } from 'utils/test';

describe('InfoTable', () => {
  const props = {
    mainTitle: 'mocked_title',
    data: [
      {
        percent: 10,
        quantity: 10,
        title: 'mocked_title',
      },
      {
        percent: 10,
        quantity: 10,
        title: 'mocked_title',
      },
    ],
    preTitle: 'mocked_pre_title',
  };
  it('it should render Info Table', async () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const { getByTestId } = render(
      <BrowserRouter>
        <InfoTable {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(INFO_TABLE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should display title of tile', async () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    render(
      <BrowserRouter>
        <InfoTable {...props} />
      </BrowserRouter>,
    );

    expect(props.mainTitle).toBe('mocked_title');
  });
});
