import { Rule, Styles } from '@pma/dex-wrapper';
import React, { FC, RefObject, useEffect, useState } from 'react';
import { VALIDATION_RULE } from 'utils/yup/types';

import { Ref, UseFormReturn } from 'react-hook-form';

type GenericItemFormProps = {
  name: string;
  id?: number | string;
  value?: string;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  methods: UseFormReturn;
  Element: FC<any>;
  Wrapper?: FC<any>;
  rows?: number;
  options?: Array<Record<string, number | string | boolean>>;
  domRef?: Ref | RefObject<any> | null;
  onChange?: any;
  getSelected?: (option: any) => void;
  styles?: Styles | Rule;
};
export const GenericItemField: FC<GenericItemFormProps> = ({
  name,
  id,
  value,
  methods,
  styles,
  Element,
  Wrapper = 'div',
  placeholder,
  label,
  readonly,
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
    trigger,
    register,
    formState: { errors },
    setValue,
  } = methods;
  register(name);

  const element = (
    <div>
      <Element
        {...props}
        options={options}
        getSelected={getSelected}
        isValid={!errors[name]}
        styles={styles}
        name={name}
        value={state}
        readonly={readonly}
        onChange={(e) => {
          setState(e.target.value);
          setValue(name, e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
          trigger(name);
        }}
        domRef={id ? register(id.toString()) : register(name).ref} // when we have symbols in name it will broke an app
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
    <Wrapper
      label={label}
      errormessage={
        errors[name] &&
        [VALIDATION_RULE.MIN_LENGTH, VALIDATION_RULE.MAX_LENGTH, VALIDATION_RULE.REQUIRED].includes(errors[name].type)
          ? errors[name].message
          : ''
      }
    >
      {element}
    </Wrapper>
  );
};
