import { useSelector } from 'react-redux';
import { getStatisticReportSelector } from '@pma/store';
import { lowerCaseFirstLetter } from 'utils/helper';

const useStatisticsReport = (args) => {
  const [[data], metadata] = useSelector(getStatisticReportSelector) || [];

  if (data?.length && metadata?.length) {
    const statisticReport = args.reduce((acc, item, index) => {
      acc[lowerCaseFirstLetter(item)] = data?.[metadata?.findIndex((item) => item.id === args[index])];
      return acc;
    }, {});
    return statisticReport;
  }
  return {};
};

export default useStatisticsReport;
