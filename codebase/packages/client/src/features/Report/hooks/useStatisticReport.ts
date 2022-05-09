import { useSelector } from 'react-redux';
import { getStatisticReportSelector, approvedObjectivesSelector, notApprovedObjectivesSelector } from '@pma/store';
import { upperCaseFirstLetter } from 'utils/helper';

export const useStatisticsReport = (args) => {
  const [[data], metadata] = useSelector(getStatisticReportSelector) || [];
  const [approvedObjPercent, approvedObjTitle] = useSelector(approvedObjectivesSelector);
  const [notApprovedObjPercent, notApprovedObjTitle] = useSelector(notApprovedObjectivesSelector);

  const objectivesGroup = {
    approvedObjPercent,
    approvedObjTitle,
    notApprovedObjPercent,
    notApprovedObjTitle,
  };

  const getKey = (key) =>
    key
      .split('-')
      .map((item, i) => {
        if (!i) return item;
        return upperCaseFirstLetter(item);
      })
      .join('');

  if (data?.length && metadata?.length) {
    const statisticReport = args.reduce(
      (acc, item, index) => ({
        ...acc,
        [getKey(item)]: data?.[metadata?.findIndex((item) => item.id === args[index])],
      }),
      {},
    );

    return { ...statisticReport, ...objectivesGroup };
  }
  return { ...objectivesGroup };
};
