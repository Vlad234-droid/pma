import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithTheme as render } from 'utils/test';

import { View } from './config';
import PieChart from './PieChart';

describe('<PieChart />', () => {
  it('should render link and content, if link is passed', () => {
    const props = {
      data: [],
      display: View.CHART,
      link: 'mocked_link',
    };

    const { getByTestId } = render(<BrowserRouter><PieChart {...props} /></BrowserRouter>);

    expect(getByTestId('pie-chart-content-id').closest('a')).toHaveAttribute('href', '/mocked_link')
    expect(getByTestId('pie-chart-content-id')).toBeInTheDocument();
  });

  it('should render wrapper and content, if link not passed', () => {
    const props = {
      data: [],
      display: View.CHART,
    };

    const { getByTestId } = render(<PieChart {...props} />);

    expect(getByTestId('pie-chart-wrapper')).toBeInTheDocument();
    expect(getByTestId('pie-chart-content-id')).toBeInTheDocument();
  });
});
