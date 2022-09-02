import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Report, { REPORT_WRAPPER } from './Report';
import { PieChart } from 'components/PieChart';
import InfoTable from 'components/InfoTable';
import TableWidget, { INFO_TABLE_WRAPPER } from './widgets/TableWidget';
import { View } from 'features/general/Report/config';
import { Rating, ReportPage } from 'config/enum';
import { getCurrentYear, getNextYear } from 'utils';
import { FILTER_WRAPPER } from './components/FilterModal/FilterModal';
import { LEFT_SIDE_BUTTON } from 'components/ButtonsWrapper/ButtonsWrapper';
import { PERCENT_ID, TITLE_ID } from 'components/PieChart/PieChart';

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
      data: [{ percentage: '67' }],
      display: View.CHART,
    };
    const { findByTestId } = render(<PieChart {...props} />);

    const percent = await findByTestId(PERCENT_ID);

    expect(await percent).toBeInTheDocument();
  });

  it('render title of pieChart', async () => {
    const props = {
      title: 'WL4 & 5 Objectives submitted',
      data: [{ percentage: '67' }],
      display: View.CHART,
    };
    const { findByTestId } = render(<PieChart {...props} />);

    const titlePercent = await findByTestId(TITLE_ID);
    expect(await titlePercent).toBeInTheDocument();
  });

  it('it should render info table component', async () => {
    const props = {
      data: [
        { percentage: '4', count: '4', title: Rating.BELOW_EXPECTED },
        { percentage: '48', count: '54', title: Rating.SATISFACTORY },
        { percentage: '35', count: '39', title: Rating.GREAT },
        { percentage: '13', count: '15', title: Rating.OUTSTANDING },
      ],
      mainTitle: 'Breakdown of Mid-year ratings',
    };
    const { findByTestId } = render(
      <TableWidget customData={props.data} configKey={ReportPage.REPORT_APPROVED_OBJECTIVES}>
        {({ data }) => <InfoTable data={data} mainTitle={props.mainTitle} />}
      </TableWidget>,
    );

    const wrapper = await findByTestId(INFO_TABLE_WRAPPER);
    expect(await wrapper).toBeInTheDocument();
  });
  it('it should change select value ', () => {
    const prevYear = `${getCurrentYear()}-${getNextYear(1)}`;

    const { getByTestId, queryByText, getAllByText } = render(
      <BrowserRouter>
        <Report />
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('year_options'));
    fireEvent.click(getAllByText(prevYear)[0]);

    expect(queryByText('Choose an area')).not.toBeInTheDocument();
    expect(getAllByText(prevYear)[0]).toBeInTheDocument();
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
