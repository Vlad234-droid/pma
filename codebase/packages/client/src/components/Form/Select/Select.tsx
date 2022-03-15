import React, { FC, MouseEvent, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { Rule, useStyle } from '@dex-ddl/core';

import { Icon } from 'components/Icon';
import useEventListener from 'hooks/useEventListener';

import { SelectField, Option } from '../types';
import { useFormContainer } from '../context/input';

const getSelectedOption = (options: Option[], value?: string) =>
  value ? options.filter((option) => option.value === value)[0] : undefined;

const Select: FC<SelectField> = ({ domRef, name, options, placeholder, value, onChange }) => {
  const { css } = useStyle();
  const { inputRef } = useFormContainer();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option | undefined>(getSelectedOption(options, value));

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setOpen(false);
    }
  };

  useEventListener('click', handleClickOutside);

  const toggleList = () => {
    setOpen((isOpen) => !isOpen);
  };

  const handleSelect = (event, selected: Option) => {
    setSelected(selected);
    onChange({ ...event, target: { ...event.target, value: selected.value } });
    setOpen(false);
  };

  return (
    <div className={css(wrapperStyles)} data-test-id={`${name}-wrapper`} ref={ref}>
      <button
        type='button'
        data-test-id={name}
        onClick={toggleList}
        className={css(fieldStyles, isOpen ? fieldActiveStyles : {})}
        ref={mergeRefs([domRef, inputRef])}
      >
        {selected ? (
          <div>{selected.label}</div>
        ) : (
          <div className={css(placeholderStyles)}>{placeholder ? `- ${placeholder} -` : ''}</div>
        )}
        <div className={css(iconWrapperStyles)}>
          <Icon
            graphic='arrowDown'
            iconStyles={{ ...iconStyles, ...(isOpen ? iconExpandStyles : {}) }}
            fill='#A8A8A8'
          />
        </div>
      </button>
      {isOpen && (
        <div role='list' data-test-id={`${name}-list`} className={css(listStyles)}>
          {options.map((item) => (
            <button
              type='button'
              key={item.value}
              className={css(optionStyles)}
              onClick={(event) => handleSelect(event, item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

const wrapperStyles: Rule = {
  display: 'table',
  width: '100%',
  position: 'relative',
};

const fieldStyles: Rule = ({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  border: `1px solid ${theme.colors.backgroundDarkest}`,
  background: `${theme.colors.white}`,
  borderRadius: '5px',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  padding: '10px 40px 10px 16px',
  ':focus': {
    outline: 'none !important',
    border: `1px solid ${theme.colors.tescoBlue}`,
  },
  cursor: 'pointer',
  minHeight: '42px',
});

const fieldActiveStyles: Rule = ({ theme }) => ({
  outline: 'none !important',
  border: `1px solid ${theme.colors.tescoBlue}`,
});

const placeholderStyles: Rule = ({ theme }) => ({
  color: `${theme.colors.grayscale}`,
});

const iconStyles: Rule = {
  transition: 'transform 0.4s ease',
  cursor: 'pointer',
};

const iconWrapperStyles: Rule = {
  position: 'absolute',
  right: '10px',
};

const iconExpandStyles: Rule = {
  transform: 'rotate(180deg)',
};

const listStyles: Rule = ({ theme }) => ({
  display: 'block',
  position: 'absolute',
  border: `1px solid ${theme.colors.lightGray}`,
  borderRadius: theme.border.radius.sm,
  background: theme.colors.white,
  width: '100%',
  zIndex: 999,
});

const optionStyles: Rule = ({ theme }) => ({
  display: 'block',
  width: '100%',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  padding: '10px 30px 10px 16px',
  border: 'none',
  background: `${theme.colors.white}`,
  cursor: 'pointer',
  textAlign: 'left',
  ':hover': {
    // @ts-ignore
    background: `${theme.colors.lightBlue}`,
  },
});
