import { useSelector } from 'react-redux';
import { getStatisticReportSelector } from '@pma/store';
import { upperCaseFirstLetter } from 'utils/helper';

const useStatisticsReport = (args) => {
  const [[data], metadata] = useSelector(getStatisticReportSelector) || [];

  const getKey = (key) => {
    return key
      .split('-')
      .map((item, i) => {
        if (!i) return item;
        return upperCaseFirstLetter(item);
      })
      .join('');
  };

  if (data?.length && metadata?.length) {
    const statisticReport = args.reduce((acc, item, index) => {
      acc[getKey(item)] = data?.[metadata?.findIndex((item) => item.id === args[index])];
      return acc;
    }, {});

    return statisticReport;
  }
  return {};
};

export default useStatisticsReport;
