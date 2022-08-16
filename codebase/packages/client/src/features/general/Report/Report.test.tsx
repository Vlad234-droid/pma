import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Report, { REPORT_WRAPPER } from './Report';
import { PieChart } from 'components/PieChart';
import InfoTable, { INFO_TABLE_WRAPPER } from 'components/InfoTable';

import { View } from 'components/PieChart/config';
import { Rating } from 'config/enum';
import { getCurrentYear, getNextYear } from 'utils';
import { FILTER_WRAPPER } from './components/FilterModal/FilterModal';
import { LEFT_SIDE_BUTTON } from 'components/ButtonsWrapper/ButtonsWrapper';

describe('Report page', () => {
  it('render report wrapper', async () => {
    const { getByTestId } = render(
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
    const { findByTestId } = render(<PieChart {...props} />);

    const percent = await findByTestId('percent_id');

    expect(await percent).toBeInTheDocument();
  });

  it('render title of pieChart', async () => {
    const props = {
      title: 'WL4 & 5 Objectives submitted',
      data: [{ percent: 67 }],
      display: View.CHART,
    };
    const { findByTestId } = render(<PieChart {...props} />);

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
    const { findByTestId } = render(<InfoTable {...props} />);

    const wrapper = await findByTestId(INFO_TABLE_WRAPPER);
    expect(await wrapper).toBeInTheDocument();
  });
  it('it should change select value ', () => {
    const prevYear = `${getCurrentYear()}-${getNextYear(1)}`;

    const { getByTestId, queryByText, getByText } = render(
      <BrowserRouter>
        <Report />
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('year_options'));
    fireEvent.click(getByText(prevYear));

    expect(queryByText('Choose an area')).not.toBeInTheDocument();
    expect(getByText(prevYear)).toBeInTheDocument();
  });
  it('it should open report modal', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Report />
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('edit'));
    expect(getByTestId('modal-wrapper')).toBeInTheDocument();
  });
  it('it should close report modal', async () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Report />
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId('edit'));
    expect(getByTestId('modal-wrapper')).toBeInTheDocument();
    const cancel = getByTestId(LEFT_SIDE_BUTTON);
    expect(cancel).toBeInTheDocument();

    fireEvent.click(cancel);
    await waitFor(() => {
      expect(queryByTestId('modal-wrapper')).not.toBeInTheDocument();
    });
  });
  it('it should open filter modal', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Report />
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('settings'));
    expect(getByTestId(FILTER_WRAPPER)).toBeInTheDocument();
  });
  it('it should open edit dashboard', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Report />
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('download'));
    expect(getByTestId('modal-wrapper')).toBeInTheDocument();
  });
});
