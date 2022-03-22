import { useSelector } from 'react-redux';
import { getStatisticReportSelector, approvedObjectivesSelector, notApprovedObjectivesSelector } from '@pma/store';
import { upperCaseFirstLetter } from 'utils/helper';

export const useStatisticsReport = (args) => {
  const [[data], metadata] = useSelector(getStatisticReportSelector) || [];
  const [approvedObjPercent, approvedObjTitle] = useSelector(approvedObjectivesSelector);
  const [notApprovedObjPercent, notApprovedObjTitle] = useSelector(notApprovedObjectivesSelector);

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

    return { ...statisticReport, approvedObjPercent, approvedObjTitle, notApprovedObjPercent, notApprovedObjTitle };
  }
  return { approvedObjPercent, approvedObjTitle, notApprovedObjPercent, notApprovedObjTitle };
};
