import { FormField } from './types';

const _injectFields = <T>(fields: FormField<keyof T>[], name, injectFields: Partial<FormField<keyof T>>) =>
  fields.map((field) => {
    if (field.name == name)
      return {
        ...field,
        ...injectFields,
      };

    return field;
  });

export { _injectFields as injectFields };
