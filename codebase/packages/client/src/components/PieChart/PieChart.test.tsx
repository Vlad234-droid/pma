import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';

import PieChart, { TEST_ID, TITLE_ID, PERCENT_ID } from './PieChart';
import { View } from 'features/general/Report/config';

describe('PieChartContent', () => {
  const props = {
    title: 'Test title',
    data: [],
    display: View.CHART,
  };

  it('should render PieChartContent body', async () => {
    const { queryByTestId } = render(<PieChart {...props} />);

    const body = queryByTestId(TEST_ID);
    expect(body).toBeInTheDocument();
  });

  it('should render PieChartContent title', async () => {
    const { queryByTestId } = render(<PieChart {...props} />);

    const title = queryByTestId(TITLE_ID);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(props.title);
  });

  it('should NOT render PieChartContent percent', async () => {
    const { queryByTestId } = render(<PieChart {...props} />);

    const percent = queryByTestId(PERCENT_ID);
    expect(percent).not.toBeInTheDocument();
  });

  it('should render PieChartContent percent', async () => {
    const propsWithData = { ...props, data: [{ percentage: '10' }] };
    const { queryByTestId } = render(<PieChart {...propsWithData} />);

    const percent = queryByTestId(PERCENT_ID);
    expect(percent).toBeInTheDocument();
  });
});
