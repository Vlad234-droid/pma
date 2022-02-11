import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import Report from './Report';
import { REPORT_WRAPPER } from './Report';
import { PieChart } from '../../components/PieChart';
import { View } from '../../components/PieChart/PieChart';
import InfoTable from './components/InfoTable';
import { Rating } from '../../config/enum';

describe('Report page', () => {
  it('render report wrapper', async () => {
    const { getByTestId } = renderWithTheme(<Report />);
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
      title: 'Wl4 & 5 Objectives submitted',
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

    const wrapper = await findByTestId('info_table_id');
    expect(await wrapper).toBeInTheDocument();
  });

  it('it should change value on dropdown', async () => {
    const { getByTestId } = renderWithTheme(<Report />);
    const dropDown = getByTestId('year_options');
    expect(dropDown).toBeInTheDocument();
    fireEvent.change(dropDown, { target: { value: 'id_1' } });
  });
});
