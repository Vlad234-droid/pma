import React, { FC, useState, useEffect, useRef } from 'react';
import { colors, useStyle } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';

import { TextareaField } from '../types';
import { useFormContainer } from '../context/input';

const Textarea: FC<TextareaField> = ({
  domRef,
  placeholder = '',
  rows = 3,
  name,
  value: defaultValue,
  onChange,
  isValid,
  readonly = false,
}) => {
  const { css } = useStyle();
  const { inputRef, setFocus } = useFormContainer();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [value, setValue] = useState<string>('');

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '80px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);
  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  return (
    <textarea
      ref={mergeRefs([domRef, inputRef, textareaRef])}
      name={name}
      data-test-id={name}
      readOnly={readonly}
      onChange={textAreaChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={css({
        width: '100%',
        minHeight: '40px',
        border: `1px solid ${isValid ? colors.backgroundDarkest : colors.error}`,
        borderRadius: '5px',
        fontSize: '14px',
        lineHeight: '18px',
        padding: '10px 40px 10px 16px',
        resize: 'vertical',
        ':focus': {
          outline: 'none !important',
          border: `1px solid ${colors.tescoBlue}`,
        },
      })}
      value={value}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

export default Textarea;
