import { useFieldArray } from 'react-hook-form';
export const useFieldsArray = (defaultValues, control) =>
  Object.keys(defaultValues).map((name) => {
    const { fields, update, replace } = useFieldArray({
      control,
      name,
    });
    return { fields, type: name, update, replace };
  });

export type useFieldsType = ReturnType<typeof useFieldsArray>;
