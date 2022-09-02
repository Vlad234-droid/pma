import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithTheme as render } from 'utils/test';

import { View } from '../config';
import ChartWidget, { PIE_CHART_WRAPPER } from './ChartWidget';
import { PieChart } from 'components/PieChart';

describe('<PieChart />', () => {
  it('should render link and content, if link is passed', () => {
    const props = {
      customData: [{ percentage: '10', count: '10' }],
      display: View.CHART,
      link: 'mocked_link',
    };
    const { getByTestId } = render(
      <BrowserRouter>
        <ChartWidget {...props}>{({ data }) => <PieChart data={data} display={View.CHART} />}</ChartWidget>
      </BrowserRouter>,
    );

    expect(getByTestId('pie-chart-content-id').closest('a')).toHaveAttribute('href', '/mocked_link');
    expect(getByTestId('pie-chart-content-id')).toBeInTheDocument();
  });

  it('should render wrapper and content, if link not passed', () => {
    const props = {
      data: [],
      display: View.CHART,
    };

    const { getByTestId } = render(
      <ChartWidget {...props}>{({ data }) => <PieChart data={data} display={View.CHART} />}</ChartWidget>,
    );

    expect(getByTestId(PIE_CHART_WRAPPER)).toBeInTheDocument();
    expect(getByTestId('pie-chart-content-id')).toBeInTheDocument();
  });
});
