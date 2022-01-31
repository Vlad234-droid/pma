import { Rating } from 'config/enum';

export const getCurrentData = () => {
  const currentYear = new Date().getFullYear();
  return [
    {
      name: Rating.OUTSTANDING,
      [currentYear]: 13,
    },
    {
      name: Rating.GREAT,
      [currentYear]: 37,
    },
    {
      name: Rating.SATISFACTORY,
      [currentYear]: 46,
    },
    {
      name: Rating.BELOW_EXPECTED,
      [currentYear]: 6,
    },
  ]
};

export const getCompareData = (compareMode: string) => {
  const data = [
    {
      name: Rating.OUTSTANDING,
      '2021': 17,
      'Expected distribution': 11,
    },
    {
      name: Rating.GREAT,
      '2021': 33,
      'Expected distribution': 35,
    },
    {
      name: Rating.SATISFACTORY,
      '2021': 40,
      'Expected distribution': 48,
    },
    {
      name: Rating.BELOW_EXPECTED,
      '2021': 12,
      'Expected distribution': 4,
    },
  ];

  return data.map((item) => ({
    'name': item.name,
    [compareMode]: item[compareMode]
  }));
};

export const getGraphBars = (data: any) => {
  const bars: string[] = [];
  Object.keys(data[0]).forEach((key) => {
    if (key !== 'name') {
      bars.push(key);
    }
  });

  return bars;
};

export const getComputedData = (data: any, compareData?: any) => {
  if (!compareData) return data;

  return data.map((item, index) => ({
    ...item,
    ...compareData[index],
  }));
};
