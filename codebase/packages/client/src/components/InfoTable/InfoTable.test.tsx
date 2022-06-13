import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import InfoTable, { INFO_TABLE_WRAPPER } from './InfoTable';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';

describe('InfoTable component', () => {
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
    hoverMessage: '',
    hoverVisibility: true,
    link: '',
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
  it('it should display hover message', async () => {
    props.hoverMessage = 'mocked_message';
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <InfoTable {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(INFO_TABLE_WRAPPER);
    fireEvent.mouseOver(wrapper);
    expect(getByText(props.hoverMessage)).toBeInTheDocument();
  });
  it('it should display Link tile', async () => {
    props.link = 'mocked_link';
    const nodeName = 'A';
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const { getByTestId } = render(
      <BrowserRouter>
        <InfoTable {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(INFO_TABLE_WRAPPER);
    expect(wrapper.nodeName).toEqual(nodeName);
  });
});
