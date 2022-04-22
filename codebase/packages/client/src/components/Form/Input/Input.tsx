import React, { FC } from 'react';
import { CreateRule, useStyle } from '@pma/dex-wrapper';
import mergeRefs from 'react-merge-refs';

import { InputField } from '../types';
import { useFormContainer } from '../context/input';

const Input: FC<InputField> = ({
  domRef,
  placeholder = '',
  onChange,
  onFocus,
  name,
  value,
  isValid = true,
  customStyles,
  readonly,
  onBlur,
  type = 'text',
  min,
  defaultValue,
}) => {
  const { css } = useStyle();
  const { inputRef, setFocus } = useFormContainer();

  return (
    <input
      type={type}
      ref={mergeRefs([domRef, inputRef])}
      name={name}
      data-test-id={`input-${name}`}
      value={value}
      onChange={onChange}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e);
        }
        setFocus(false);
      }}
      onFocus={() => {
        if (onFocus) {
          onFocus();
        }
        setFocus(true);
      }}
      readOnly={readonly}
      min={min}
      defaultValue={defaultValue}
      className={css(inputStyle({ isValid }), {
        ...customStyles,
      })}
      placeholder={placeholder}
    />
  );
};

const inputStyle: CreateRule<{ isValid?: boolean }> =
  ({ isValid }) =>
  ({ theme }) => ({
    width: '100%',
    // @ts-ignore
    border: `2px solid ${isValid ? theme.colors.lightGray : theme.colors.error}`,
    borderRadius: '5px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    padding: '10px 40px 10px 16px',
    ':focus': {
      outline: 'none !important',
      border: `2px solid ${theme.colors.tescoBlue}`,
    },
  });

export default Input;
