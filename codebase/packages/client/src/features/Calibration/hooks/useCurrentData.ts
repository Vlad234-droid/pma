import useQueryString from 'hooks/useQueryString';
import { convertToReportEnum } from 'features/TileReport/utils';
import { useLocation } from 'react-router-dom';
import { ReportPage } from 'config/enum';
import { useChartDataStatistics } from 'features/useChartDataStatistics';
import { useTranslation } from 'components/Translation';
import { getCurrentYear } from 'utils';

export const useCurrentData = (compareData2: Array<Record<string | number, string | number>> = []) => {
  const { t } = useTranslation();
  const query = useQueryString() as Record<string, string>;
  const { pathname } = useLocation();

  const compareYear = compareData2.length && Object.keys(compareData2[0])[0];

  const chartData = useChartDataStatistics(t, ReportPage[convertToReportEnum(pathname)]) || [];
  const computedChartData = [...chartData].map((item, i) => {
    const ob = {
      [query.year || getCurrentYear()]: item.percent,
      name: item.title,
      ...(compareData2.length && { [compareYear]: compareData2[i][compareYear] }),
    };

    return ob;
  });

  return [computedChartData, chartData];
};
