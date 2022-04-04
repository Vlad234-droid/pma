import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Report, { REPORT_WRAPPER } from './Report';
import { PieChart } from '../../components/PieChart';
import { View } from 'components/PieChart/config';
import InfoTable from './components/InfoTable';
import { Rating } from '../../config/enum';
import { INFO_TABLE_WRAPPER } from './components/InfoTable/InfoTable';
import { Page } from 'pages';

describe('Report page', () => {
  it('render report wrapper', async () => {
    const history = createMemoryHistory();
    history.push(Page.REPORT);
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <Report />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(REPORT_WRAPPER);

    expect(wrapper).toBeInTheDocument();
  });
  it('should render pieChart', async () => {
    const props = {
      title: 'Objectives submitted',
      data: [{ percent: 67 }],
      display: View.CHART,
    };
    const { findByTestId } = renderWithTheme(<PieChart {...props} />);

    const percent = await findByTestId('percent_id');

    expect(await percent).toBeInTheDocument();
  });

  it('render title of pieChart', async () => {
    const props = {
      title: 'WL4 & 5 Objectives submitted',
      data: [{ percent: 67 }],
      display: View.CHART,
    };
    const { findByTestId } = renderWithTheme(<PieChart {...props} />);

    const titlePercent = await findByTestId('titleId');
    expect(await titlePercent).toBeInTheDocument();
  });

  it('it should render info table component', async () => {
    const props = {
      data: [
        { percent: 4, quantity: 4, title: Rating.BELOW_EXPECTED },
        { percent: 48, quantity: 54, title: Rating.SATISFACTORY },
        { percent: 35, quantity: 39, title: Rating.GREAT },
        { percent: 13, quantity: 15, title: Rating.OUTSTANDING },
      ],
      mainTitle: 'Breakdown of Mid-year ratings',
    };
    const { findByTestId } = renderWithTheme(<InfoTable {...props} />);

    const wrapper = await findByTestId(INFO_TABLE_WRAPPER);
    expect(await wrapper).toBeInTheDocument();
  });
});
