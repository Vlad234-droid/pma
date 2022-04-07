import React, { FC, useState, useEffect, useRef } from 'react';
import { useStyle, CreateRule } from '@pma/dex-wrapper';
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
  styles,
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
      className={css(textAriaStyle({ isValid }), { ...styles })}
      value={value}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

const textAriaStyle: CreateRule<{ isValid?: boolean }> =
  ({ isValid }) =>
  ({ theme }) => {
    return {
      width: '100%',
      minHeight: '40px',
      // @ts-ignore
      border: `2px solid ${isValid ? theme.colors.lightGray : theme.colors.error}`,
      borderRadius: '5px',
      fontSize: '16px',
      lineHeight: '20px',
      padding: '10px 40px 10px 16px',
      resize: 'vertical',
      ':focus': {
        outline: 'none !important',
        border: `2px solid ${theme.colors.tescoBlue}`,
      },
    };
  };

export default Textarea;
