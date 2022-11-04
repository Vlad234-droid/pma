export type FilterProps = Array<{ type: string; items: Array<{ description: string }> }>;

export const initialValues: FilterProps = [
  {
    type: 'Work level',
    items: [
      { description: 'Select All' },
      { description: 'Colleagues' },
      { description: 'Work level 1' },
      { description: 'Work level 2' },
      { description: 'Work level 3' },
    ],
  },
  {
    type: 'Operational areas',
    items: [
      { description: 'Select All' },
      { description: 'Objectives' },
      { description: 'PDP' },
      { description: 'Mid-year Review' },
      { description: 'End-year Review' },
    ],
  },
  {
    type: 'Gender',
    items: [{ description: 'Select All' }, { description: 'Male' }, { description: 'Female' }],
  },
];
