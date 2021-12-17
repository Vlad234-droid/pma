import React, { FC } from 'react';
import { colors, useStyle } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';

import { InputProps } from '../types';
import { useRefContainer } from '../context/input';

const Input: FC<InputProps> = ({
  domRef,
  placeholder = '',
  onChange,
  name,
  value,
  isValid = true,
  type = 'text',
  customStyles,
  onFocus,
  readonly,
}) => {
  const { css } = useStyle();
  const refIcon = useRefContainer();

  return (
    <input
      ref={mergeRefs([domRef, refIcon])}
      name={name}
      data-test-id={name}
      value={value}
      onChange={onChange}
      onFocus={() => {
        onFocus && onFocus();
      }}
      type={type}
      readOnly={readonly}
      className={css({
        width: '100%',
        border: `1px solid ${isValid ? colors.backgroundDarkest : colors.error}`,
        borderRadius: '5px',
        fontSize: '16px',
        lineHeight: '20px',
        padding: '10px 30px 10px 16px',
        ':focus': {
          outline: 'none !important',
          border: `1px solid ${isValid ? colors.tescoBlue : colors.error}`,
        },
        ...(customStyles && customStyles),
      })}
      placeholder={placeholder}
    />
  );
};

export default Input;
