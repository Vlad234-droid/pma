import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import InfoTable from './InfoTable';

describe('TableContent', () => {
  const props = {
    mainTitle: 'Title',
    data: [
      { title: 'Title 1', percentage: '10', count: '40' },
      { title: 'Title 2', percentage: '50', count: '30' },
      { title: 'Title 3', percentage: '30', count: '70' },
    ],
    preTitle: 'Pre title',
  };

  it('#render Main Title', async () => {
    const { getByText } = render(<InfoTable {...props} />);
    expect(getByText(props.mainTitle)).toBeInTheDocument();
  });

  it('#render Pre Title', async () => {
    const { getByText } = render(<InfoTable {...props} />);
    expect(getByText(props.preTitle)).toBeInTheDocument();
  });

  it('#render chartData Title', async () => {
    const { getByText } = render(<InfoTable {...props} />);
    expect(getByText(props.data[0].title)).toBeInTheDocument();
  });
});
