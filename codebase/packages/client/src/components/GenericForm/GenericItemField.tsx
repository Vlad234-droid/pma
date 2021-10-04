import React, { FC } from 'react';

import { UseFormReturn } from 'react-hook-form';

type GenericItemFormProps = {
  name: string;
  label?: string;
  placeholder?: string;
  methods: UseFormReturn;
  Element: FC<any>;
  Wrapper?: FC<any>;
  rows?: number;
  options?: Array<Record<string, number | string | boolean>>;
};
export const GenericItemField: FC<GenericItemFormProps> = ({
  name,
  methods,
  Element,
  Wrapper = 'div',
  placeholder,
  label,
  ...props
}) => {
  const { register, formState } = methods;
  const { errors } = formState;
  const element = (
    <Element
      {...props}
      isValid={!errors[name]}
      name={name}
      onChange={register(name).onChange}
      domRef={register(name).ref}
      placeholder={placeholder}
    />
  );

  if (!Wrapper && !label) {
    return element;
  }

  return (
    <Wrapper label={label} errormessage={errors[name] && errors[name].type === 'required' ? errors[name].message : ''}>
      {element}
    </Wrapper>
  );
};
