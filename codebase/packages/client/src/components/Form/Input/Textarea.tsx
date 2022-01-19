import React, { FC } from 'react';
import { useStyle, colors } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';

import { TextareaField } from '../types';
import { useRefContainer } from '../context/input';

const Textarea: FC<TextareaField> = ({
  domRef,
  placeholder = '',
  styles = {},
  rows = 3,
  name,
  value,
  onChange,
  isValid,
  readonly = false,
}) => {
  const { css } = useStyle();
  const refIcon = useRefContainer();

  return (
    <textarea
      ref={mergeRefs([domRef, refIcon])}
      name={name}
      data-test-id={name}
      readOnly={readonly}
      onChange={onChange}
      className={css({
        width: '100%',
        minHeight: '40px',
        border: `1px solid ${isValid ? colors.backgroundDarkest : colors.error}`,
        borderRadius: '5px',
        fontSize: '16px',
        lineHeight: '20px',
        padding: '10px 30px 10px 16px',
        resize: 'vertical',

        ':focus': {
          outline: 'none !important',
          border: `1px solid ${isValid ? colors.tescoBlue : colors.error}`,
        },
      })}
      value={value}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

export default Textarea;
