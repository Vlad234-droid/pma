import { RatingChartData } from '../config/types';

export const getGraphBars = (data: RatingChartData) => {
  const bars: string[] = [];
  Object.keys(data[0]).forEach((key) => {
    if (key !== 'name') {
      bars.push(key);
    }
  });

  return bars;
};

export const getComputedData = (data: RatingChartData, compareData?: RatingChartData) => {
  if (!compareData) return data;

  return data.map((item, index) => ({
    ...item,
    ...compareData[index],
  }));
};
