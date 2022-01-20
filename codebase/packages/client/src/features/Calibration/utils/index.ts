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
];

export const getMockFilterOptions = () => (
  [
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
    }
  ]
);
