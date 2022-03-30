import { Rating } from 'config/enum';

export const getMockFilterOptions = () => [
  {
    id: 0,
    options: ['Names A-Z', 'Names Z-A'],
    title: 'Sort by',
    multi: false,
  },
  {
    id: 1,
    options: ['Colleagues', 'Work level 1', 'Work level 2'],
    title: 'Work level',
    multi: true,
  },
  {
    id: 2,
    options: ['Name 1', 'Name 2', 'Name 3'],
    title: 'Line manager',
    multi: true,
  },
  {
    id: 3,
    options: ['F 1', 'F 2', 'F 3'],
    title: 'Function',
    multi: true,
  },
  {
    id: 4,
    options: ['F 1', 'F 2', 'F 3'],
    title: 'Department',
    multi: true,
  },
  {
    id: 5,
    options: ['F 1', 'F 2', 'F 3'],
    title: 'Job title',
    multi: true,
  },
  {
    id: 6,
    options: ['F 1', 'F 2', 'F 3'],
    title: 'Rating',
    multi: true,
  },
  {
    id: 7,
    options: ['F 1', 'F 2', 'F 3'],
    title: 'Store',
    multi: true,
  },
  {
    id: 8,
    options: ['F 1', 'F 2', 'F 3'],
    title: 'Operational areas',
    multi: true,
  },
];

export const getCompareOptions = (t) => [
  {
    id: '1',
    label: 'None',
    text: t('none', 'None'),
  },
  {
    id: '2',
    label: 'Expected distribution',
    text: t('expected_distribution', 'Expected distribution'),
  },
  {
    id: '3',
    label: '2021',
    text: '2021',
  },
];

export const getCurrentData = () => {
  const currentYear = new Date().getFullYear();

  return {
    title: currentYear.toString(),
    ratings: {
      [Rating.OUTSTANDING]: 13,
      [Rating.GREAT]: 37,
      [Rating.SATISFACTORY]: 46,
      [Rating.BELOW_EXPECTED]: 7,
    },
  };
};

export const getCompareData = (compareMode: string) => {
  const data = [
    {
      title: '2021',
      ratings: {
        [Rating.OUTSTANDING]: 12,
        [Rating.GREAT]: 31,
        [Rating.SATISFACTORY]: 6,
        [Rating.BELOW_EXPECTED]: 6,
      },
    },
    {
      title: 'Expected distribution',
      ratings: {
        [Rating.OUTSTANDING]: 11,
        [Rating.GREAT]: 35,
        [Rating.SATISFACTORY]: 48,
        [Rating.BELOW_EXPECTED]: 4,
      },
    },
  ];

  return data.filter((item) => item.title === compareMode)[0];
};

export const getRatingsOptions = () => [
  { value: Rating.OUTSTANDING, label: Rating.OUTSTANDING },
  { value: Rating.GREAT, label: Rating.GREAT },
  { value: Rating.SATISFACTORY, label: Rating.SATISFACTORY },
  { value: Rating.BELOW_EXPECTED, label: Rating.BELOW_EXPECTED },
];

export const getRatingValues = () => ({
  [Rating.BELOW_EXPECTED]: 1,
  [Rating.SATISFACTORY]: 2,
  [Rating.GREAT]: 3,
  [Rating.OUTSTANDING]: 4,
});
