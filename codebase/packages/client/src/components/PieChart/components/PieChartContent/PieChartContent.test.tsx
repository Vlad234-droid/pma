import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';

import PieChartContent, { TEST_ID } from './PieChartContent';
import { View } from 'components/PieChart/config';

describe('PieChartContent', () => {
  const props = {
    title: 'Test title',
    titleId: 'title-test-id',
    data: [],
    display: View.CHART,
    percentId: 'percent-test-id',
  };

  it('should render PieChartContent body', async () => {
    const { queryByTestId } = render(<PieChartContent {...props} />);

    const body = queryByTestId(TEST_ID);
    expect(body).toBeInTheDocument();
  });

  it('should render PieChartContent title', async () => {
    const { queryByTestId } = render(<PieChartContent {...props} />);

    const title = queryByTestId(props.titleId);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(props.title);
  });

  it('should NOT render PieChartContent percent', async () => {
    const { queryByTestId } = render(<PieChartContent {...props} />);

    const percent = queryByTestId(props.percentId);
    expect(percent).not.toBeInTheDocument();
  });

  it('should render PieChartContent percent', async () => {
    const propsWithData = { ...props, data: [{ percent: 10 }] };
    const { queryByTestId } = render(<PieChartContent {...propsWithData} />);

    const percent = queryByTestId(props.percentId);
    expect(percent).toBeInTheDocument();
  });
});
