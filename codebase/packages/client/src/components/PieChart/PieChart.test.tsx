import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithTheme as render } from 'utils/test';

import { View } from './config';
import PieChart, { PIE_CHART_WRAPPER } from './PieChart';
import { fireEvent } from '@testing-library/react';

describe('<PieChart />', () => {
  it('should render link and content, if link is passed', () => {
    const props = {
      data: [],
      display: View.CHART,
      link: 'mocked_link',
      hoverMessage: '',
    };

    const { getByTestId } = render(
      <BrowserRouter>
        <PieChart {...props} />
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

    const { getByTestId } = render(<PieChart {...props} />);

    expect(getByTestId(PIE_CHART_WRAPPER)).toBeInTheDocument();
    expect(getByTestId('pie-chart-content-id')).toBeInTheDocument();
  });
  it('it should display hover message', async () => {
    const props = {
      data: [],
      display: View.CHART,
      link: 'mocked_link',
      hoverMessage: 'mocked_message',
    };

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <PieChart {...props} />
      </BrowserRouter>,
    );

    const wrapper = getByTestId(PIE_CHART_WRAPPER);
    fireEvent.mouseOver(wrapper);
    expect(getByText(props.hoverMessage)).toBeInTheDocument();
  });
});
