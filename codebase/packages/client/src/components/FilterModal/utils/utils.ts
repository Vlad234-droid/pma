import { FilterType } from '../types';

export const prepareDefaultValues = ({ defaultValues, savedFilter }) =>
  savedFilter
    ? savedFilter
    : Object.entries(defaultValues).reduce(
        (acc, [key, items]) => ({
          ...acc,
          [key]: [
            { name: FilterType.SELECT_ALL, checked: false },
            ...(items as []).map((item: any) => ({ ...item, checked: false })),
          ],
        }),
        {},
      );
