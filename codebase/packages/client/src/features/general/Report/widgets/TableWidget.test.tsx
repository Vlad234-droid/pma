import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import InfoTable from 'components/InfoTable';
import TableWidget, { INFO_TABLE_WRAPPER } from './TableWidget';
import { renderWithTheme as render } from 'utils/test';

describe('InfoTable component', () => {
  const props = {
    mainTitle: 'mocked_title',
    data: [
      {
        percentage: '10',
        count: '10',
        title: 'mocked_title',
      },
      {
        percentage: '10',
        count: '10',
        title: 'mocked_title',
      },
    ],
    preTitle: 'mocked_pre_title',
    hoverMessage: '',
    hoverVisibility: true,
    link: '',
  };
  it('it should render Info Table', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TableWidget {...props}>{({ data }) => <InfoTable data={data} mainTitle={props.mainTitle} />}</TableWidget>
      </BrowserRouter>,
    );
    const wrapper = getByTestId(INFO_TABLE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should display title of tile', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <TableWidget {...props}>{({ data }) => <InfoTable data={data} mainTitle={props.mainTitle} />}</TableWidget>
      </BrowserRouter>,
    );
    const title = getByText(props.mainTitle);

    expect(title).toBeInTheDocument();
  });

  it('it should display Link tile', async () => {
    props.link = 'mocked_link';
    const nodeName = 'A';

    const { getByTestId } = render(
      <BrowserRouter>
        <TableWidget {...props}>{({ data }) => <InfoTable data={data} mainTitle={props.mainTitle} />}</TableWidget>
      </BrowserRouter>,
    );
    const wrapper = getByTestId(INFO_TABLE_WRAPPER);
    expect(wrapper.nodeName).toEqual(nodeName);
  });
});
