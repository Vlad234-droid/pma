import { useFieldArray, Control } from 'react-hook-form';

export const useFieldsArray = (filters: any, control: Control) =>
  Object.keys(filters).map((name) => {
    const { fields, update, replace, append } = useFieldArray({
      control,
      name,
    });
    (filters[name] as Array<{ name: string }>).forEach(({ name }) => {
      console.log({ name });
      append({ name, checked: false });
    });
    return { fields, type: name, update, replace };
  });

export type useFieldsType = ReturnType<typeof useFieldsArray>;
