import { Rating } from 'config/enum';

import { RatingChartData } from '../config/types';

export const getGraphBars = (data: Record<string, number | Rating>[]) => {
  const bars: string[] = [];
  Object.keys(data[0]).forEach((key) => {
    if (key !== 'name') {
      bars.push(key);
    }
  });

  return bars;
};

export const getComputedData = (data: RatingChartData, compareData?: RatingChartData) => {
  return Object.entries(data.ratings).reduce(
    (res, [key, value]) => {
      res.data.push({
        // @ts-ignore
        name: key,
        [data.title]: value,
        ...(compareData && { [compareData.title]: compareData.ratings[key] }),
      });
      res.total[data.title] = res.total[data.title] + value;

      if (compareData) {
        res.total[compareData.title] = res.total[compareData.title] + compareData.ratings[key];
      }
      return res;
    },
    { data: [], total: { [data.title]: 0, ...(compareData && { [compareData.title]: 0 }) } },
  );
};
