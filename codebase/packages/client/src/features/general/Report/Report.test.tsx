import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { PieChart } from 'components/PieChart';
import InfoTable from 'components/InfoTable';
import TableWidget, { INFO_TABLE_WRAPPER } from './widgets/TableWidget';
import { View } from 'features/general/Report/config';
import { Rating, ReportPage } from 'config/enum';

import { PERCENT_ID, TITLE_ID } from 'components/PieChart/PieChart';

describe('Report page', () => {
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
});
