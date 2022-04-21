import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import TableContent from './TableContent';

describe('TableContent', () => {
  const props = {
    mainTitle: 'Title',
    data: [
      { title: 'Title 1', percent: 10, quantity: 40 },
      { title: 'Title 2', percent: 50, quantity: 30 },
      { title: 'Title 3', percent: 30, quantity: 70 },
    ],
    preTitle: 'Pre title',
  };

  it('#render Main Title', async () => {
    const { getByText } = render(<TableContent {...props} />);
    expect(getByText(props.mainTitle)).toBeInTheDocument();
  });

  it('#render Pre Title', async () => {
    const { getByText } = render(<TableContent {...props} />);
    expect(getByText(props.preTitle)).toBeInTheDocument();
  });

  it('#render chartData Title', async () => {
    const { getByText } = render(<TableContent {...props} />);
    expect(getByText(props.data[0].title)).toBeInTheDocument();
  });
});
