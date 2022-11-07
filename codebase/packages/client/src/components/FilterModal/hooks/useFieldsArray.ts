import { useFieldArray } from 'react-hook-form';

export const useFieldsArray = (defaultValues, control) =>
  defaultValues.reduce((acc, { type }) => {
    const { fields, update, replace } = useFieldArray({
      control,
      name: type,
    });
    return [
      ...acc,
      {
        fields,
        type,
        update,
        replace,
      },
    ];
  }, []);
