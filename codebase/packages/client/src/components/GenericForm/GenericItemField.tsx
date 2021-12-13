import React, { FC, RefObject, useEffect, useState } from 'react';

import { Ref, UseFormReturn } from 'react-hook-form';

type GenericItemFormProps = {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  withMarkdown?: boolean;
  methods: UseFormReturn;
  Element: FC<any>;
  Wrapper?: FC<any>;
  rows?: number;
  options?: Array<Record<string, number | string | boolean>>;
  domRef?: Ref | RefObject<any> | null;
  onChange?: any;
  getSelected?: (option: any) => void;
};
export const GenericItemField: FC<GenericItemFormProps> = ({
  name,
  value,
  methods,
  Element,
  Wrapper = 'div',
  placeholder,
  withMarkdown,
  label,
  onChange,
  getSelected,
  options,
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
    <div>
      <Element
        {...props}
        options={options}
        getSelected={getSelected}
        isValid={!errors[name]}
        name={name}
        value={state}
        onChange={(e, value) => {
          setState(e.target.value);
          register(name).onChange(e);
          if (onChange) {
            onChange(e.target.value, value);
          }
        }}
        domRef={register(name).ref}
        placeholder={placeholder}
        list={`datalist-${name}`}
      />
      <datalist id={`datalist-${name}`}>
        {options?.map((option) => (
          /*@ts-ignore*/
          <option key={`option-${name}-${option.value}`} value={option.value} label={option.label} />
        ))}
      </datalist>
    </div>
  );

  if (!Wrapper && !label) {
    return element;
  }

  return (
    <Wrapper label={label} withMarkdown={withMarkdown} errormessage={errors[name] && errors[name].type === 'required' ? errors[name].message : ''}>
      {element}
    </Wrapper>
  );
};
