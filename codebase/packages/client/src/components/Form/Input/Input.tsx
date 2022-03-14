import React, { FC } from 'react';
import { CreateRule, Theme, useStyle } from '@dex-ddl/core';
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
  const { css, theme } = useStyle();
  const { inputRef, setFocus } = useFormContainer();

  return (
    <input
      type={type}
      ref={mergeRefs([domRef, inputRef])}
      name={name}
      data-test-id={name}
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
      className={css(inputStyle({ isValid, theme }), {
        ...(customStyles && customStyles),
      })}
      placeholder={placeholder}
    />
  );
};

const inputStyle: CreateRule<{ isValid?: boolean; theme: Theme }> = ({ isValid, theme }) => ({
  width: '100%',
  border: `1px solid ${isValid ? theme.colors.lightGray : theme.colors.error}`,
  borderRadius: '5px',
  fontSize: '14px',
  lineHeight: '18px',
  padding: '10px 40px 10px 16px',
  ':focus': {
    outline: 'none !important',
    border: `1px solid ${theme.colors.tescoBlue}`,
  },
});

export default Input;
