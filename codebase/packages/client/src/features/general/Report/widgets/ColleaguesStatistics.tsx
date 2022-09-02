import React, { FC } from 'react';

import InfoTable from 'components/InfoTable';
import { PieChart } from 'components/PieChart';
import { useTranslation } from 'components/Translation';
import TableWidget from 'features/general/Report/widgets/TableWidget';
import ChartWidget from 'features/general/Report/widgets/ChartWidget';
import { View } from 'features/general/Report/config';
import { getReportTitles, getTitle, checkBusinessType, checkTableChart } from '../utils';

import { ReportPage } from 'config/enum';

export const ColleaguesStatistics: FC<{ type: ReportPage }> = ({ type }) => {
  const { t } = useTranslation();

  const isBusinessType = checkBusinessType(type);
  const isTableChart = checkTableChart(type);

  return (
    <>
      {isTableChart ? (
        <TableWidget configKey={type}>
          {({ data }) => <InfoTable mainTitle={getTitle(t, type)} data={data} />}
        </TableWidget>
      ) : (
        <ChartWidget configKey={type as ReportPage}>
          {({ data }) => (
            <PieChart
              title={getReportTitles(t, type)?.chart}
              display={!isBusinessType ? View.CHART : View.QUANTITY}
              data={data}
            />
          )}
        </ChartWidget>
      )}
    </>
  );
};
