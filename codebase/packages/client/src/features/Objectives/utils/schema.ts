export const objectivesExtraSchemaOptions = (num: number) => {
  return {
    values: [
      {
        label: 'Not achieved',
        value: 'not_achieved',
      },
      {
        label: 'Achieved',
        value: 'achieved',
      },
      {
        label: 'Over-achieved',
        value: 'over_achieved',
      },
    ],
    key: `key_objective_${num}`,
    label: `Objective ${num}`,
    type: 'select',
    id: `objective_${num}`,
    validate: {
      required: true,
    },
  };
};
