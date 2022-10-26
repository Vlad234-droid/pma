import useQueryString from 'hooks/useQueryString';
import { convertToReportEnum } from 'features/general/ColleaguesReviews/utils';
import { useLocation } from 'react-router-dom';
import { ReportPage } from 'config/enum';
import { useChartDataStatistics } from 'hooks/useChartDataStatistics';
import { getCurrentYear } from 'utils';

export const useCurrentData = (compareData: Array<Record<string | number, string | number>> = []) => {
  const query = useQueryString() as Record<string, string>;
  const { pathname } = useLocation();

  const compareYear = compareData.length && Object.keys(compareData[0])[0];

  const chartData = useChartDataStatistics(ReportPage[convertToReportEnum(pathname)]) || [];
  const computedChartData = [...chartData].map((item, i) => {
    return {
      [query.year || getCurrentYear()]: item.percentage,
      name: item.title,
      ...(compareData.length && { [compareYear]: compareData[i][compareYear] }),
    };
  });

  return [computedChartData, chartData];
};
