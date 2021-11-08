import React, { FC, useState, useEffect, RefObject } from 'react';

import { Ref, UseFormReturn } from 'react-hook-form';

type GenericItemFormProps = {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  methods: UseFormReturn;
  Element: FC<any>;
  Wrapper?: FC<any>;
  rows?: number;
  options?: Array<Record<string, number | string | boolean>>;
  domRef?: Ref | RefObject<any> | null;
};
export const GenericItemField: FC<GenericItemFormProps> = ({
  name,
  value,
  methods,
  Element,
  Wrapper = 'div',
  placeholder,
  label,
  ...props
}) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    setState(value);
  }, [value]);
  const {
    register,
    formState: { errors },
  } = methods;
  const element = (
    <Element
      {...props}
      isValid={!errors[name]}
      name={name}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
        register(name).onChange(e);
      }}
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
