import React, { FC, MouseEvent, useEffect, useRef, useState, CSSProperties } from 'react';
import mergeRefs from 'react-merge-refs';
import { CreateRule, Rule, useStyle, Styles } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import useEventListener from 'hooks/useEventListener';

import { SelectField, Option } from '../types';
import { useFormContainer } from '../context/input';

const getSelectedOption = (options: Option[], value?: string | number) =>
  value ? options.filter((option) => option.value == value)[0] : undefined;

type CustomProps = {
  wrapperStyles?: Styles | Rule | CSSProperties | {};
};

type SelectProps = SelectField & CustomProps;

const Select: FC<SelectProps> = ({
  domRef,
  name,
  options,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  readonly,
  customStyles,
  wrapperStyles = {},
}) => {
  const { css } = useStyle();
  const { inputRef } = useFormContainer();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option | undefined>();

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setOpen(false);
    }
  };

  useEventListener('click', handleClickOutside);

  useEffect(() => {
    value !== undefined && setSelected(getSelectedOption(options, value));
  }, [value, options]);

  useEffect(() => {
    if (isDirty && !isOpen && onBlur) {
      onBlur();
    }
  }, [isOpen, isDirty]);

  const toggleList = () => {
    if (readonly) return;
    setOpen((isOpen) => !isOpen);
    setIsDirty(true);
  };

  const handleSelect = (event, selected: Option) => {
    setSelected(selected);
    onChange({ ...event, target: { ...event.target, value: selected.value } });
    setOpen(false);
  };

  return (
    <div className={css(containerStyles, { ...wrapperStyles })} data-test-id={`select-${name}-wrapper`} ref={ref}>
      <button
        type='button'
        data-test-id={name}
        onClick={toggleList}
        className={css(fieldStyles({ isValid: !error, isOpen }), { ...customStyles })}
        ref={mergeRefs([domRef, inputRef])}
      >
        {selected ? (
          <div className={css({ whiteSpace: 'nowrap' })}>{selected.label}</div>
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
        <div className={css(listWrapperStyles)}>
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
        </div>
      )}
    </div>
  );
};

export default Select;

const containerStyles: Rule = {
  display: 'table',
  width: '100%',
  position: 'relative',
};

const fieldStyles: CreateRule<{ isValid: boolean; isOpen: boolean }> =
  ({ isValid, isOpen }) =>
  ({ theme }) => {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      border: `2px solid ${
        isValid ? (isOpen ? theme.colors.tescoBlue : theme.colors.backgroundDarkest) : theme.colors.error
      }`,
      background: `${theme.colors.white}`,
      borderRadius: '5px',
      fontSize: `${theme.font.fixed.f16.fontSize}`,
      lineHeight: `${theme.font.fixed.f16.lineHeight}`,
      letterSpacing: '0px',
      padding: '10px 40px 10px 16px',
      ':focus': {
        outline: 'none !important',
        border: `2px solid ${isValid ? theme.colors.tescoBlue : theme.colors.error}`,
      },
      cursor: 'pointer',
      minHeight: '42px',
      color: theme.colors.base,
    };
  };

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

const listWrapperStyles: Rule = {
  display: 'block',
  position: 'absolute',
  zIndex: 999,
  width: '100%',
  paddingBottom: '10px',
  pointerEvents: 'none',
};

const listStyles: Rule = ({ theme }) => ({
  // @ts-ignore
  border: `2px solid ${theme.colors.lightGray}`,
  borderRadius: theme.border.radius.sm,
  background: theme.colors.white,
  maxHeight: '240px',
  overflow: 'auto',
  pointerEvents: 'auto',
});

const optionStyles: Rule = ({ theme }) => ({
  display: 'block',
  width: '100%',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  letterSpacing: '0px',
  padding: '10px 30px 10px 16px',
  border: 'none',
  background: `${theme.colors.white}`,
  cursor: 'pointer',
  textAlign: 'left',
  color: theme.colors.base,
  ':hover': {
    // @ts-ignore
    background: `${theme.colors.lightBlue}`,
  },
});
