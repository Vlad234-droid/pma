import { colors, Rule, Styles } from '@pma/dex-wrapper';
import React, { FC, RefObject, useEffect, useState } from 'react';
import { VALIDATION_RULE } from 'utils/yup/types';

import { Ref, UseFormReturn } from 'react-hook-form';

const WRAPPER_TEST_ID = 'generic-item-wrapper';
const ELEMENT_TEST_ID = 'generic-item-element';

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
  wrapperProps?: any;
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
  wrapperProps = {},
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
    <div data-test-id={ELEMENT_TEST_ID}>
      <Element
        {...props}
        options={options}
        getSelected={getSelected}
        isValid={!errors[name]}
        styles={{ ...customElement, ...styles }}
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
          <option
            data-test-id={option.label}
            key={`option-${name}-${option.value}`}
            /*@ts-ignore*/
            value={option.value}
            /*@ts-ignore*/
            label={option.label}
          />
        ))}
      </datalist>
    </div>
  );

  if (!Wrapper && !label) {
    return element;
  }

  return (
    <Wrapper
      testId={WRAPPER_TEST_ID}
      data-test-id={WRAPPER_TEST_ID}
      label={label}
      errormessage={
        errors[name] &&
        [VALIDATION_RULE.MIN_LENGTH, VALIDATION_RULE.MAX_LENGTH, VALIDATION_RULE.REQUIRED].includes(errors[name].type)
          ? errors[name].message
          : ''
      }
      {...wrapperProps}
    >
      {element}
    </Wrapper>
  );
};

const customElement: Rule = {
  '::placeholder': {
    color: `${colors.tescoGray}`,
  },
  color: `${colors.lightBlack}`,
};
