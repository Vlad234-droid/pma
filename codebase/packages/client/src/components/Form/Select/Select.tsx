import React, { FC, useState, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import { Rule, useStyle } from '@dex-ddl/core';
import { Icon } from 'components/Icon';

import { useRefContainer } from '../context/input';
import { SelectProps } from '../types';

const Select: FC<SelectProps> = ({
  domRef,
  onChange,
  placeholder = '',
  value = undefined,
  options,
  disabled = false,
  name,
  readonly = false,
  getSelected,
}) => {
  const { css, theme } = useStyle();
  const refIcon = useRefContainer();
  const [selectedOptionValue, setSelectedOptionValue] = useState(value);
  const [isOptionOpen, toggleOption] = useState(false);
  const selectedOptionLabel = options.find(({ value }) => value === selectedOptionValue)?.label || '';
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    if (!readonly) {
      toggleOption((isOptionOpen) => !isOptionOpen);
    }
  };

  const handleBlur = () => {
    toggleOption(false);
  };

  const handleSelectOnInput = (event) => {
    onChange && onChange(event, selectedOptionValue);

    if (getSelected !== undefined) {
      getSelected(selectedOptionValue);
    }
  };

  const handleSelect = (option) => {
    setSelectedOptionValue(option.value);

    // hack trigger manually select event on input
    const event = new Event('select');
    inputRef && inputRef.current?.dispatchEvent(event);

    toggleOption(false);
  };

  return (
    <>
      <div
        style={{
          display: 'table',
          width: '100%',
          position: 'relative',
        }}
      >
        <input
          id='select-input'
          ref={mergeRefs([domRef, refIcon, inputRef])}
          name={name}
          value={selectedOptionLabel || value}
          disabled={disabled}
          data-test-id={name}
          className={css(
            {
              width: '100%',
              border: `1px solid ${theme.colors.backgroundDarkest}`,
              borderRadius: '5px',
              fontSize: '16px',
              lineHeight: '20px',
              padding: '10px 30px 10px 16px',
              cursor: 'pointer',
              ':focus': {
                outline: 'none !important',
                border: `1px solid ${theme.colors.tescoBlue}`,
              },
            },
            isOptionOpen
              ? {
                  outline: 'none !important',
                  border: `1px solid ${theme.colors.tescoBlue}`,
                }
              : {},
          )}
          placeholder={placeholder ? `- ${placeholder} -` : ''}
          readOnly={true}
          onClick={handleClick}
          onBlur={handleBlur}
          onSelect={handleSelectOnInput}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
          }}
        >
          <Icon
            graphic='arrowDown'
            iconStyles={{ ...iconStyles, ...(isOptionOpen ? iconExpandStyles : {}) }}
            fill='#A8A8A8'
            onClick={handleClick}
          />
        </span>
        {isOptionOpen && !!options.length && (
          <div
            style={{
              display: 'block',
              position: 'absolute',
              border: `1px solid ${theme.colors.backgroundDarkest}`,
              borderRadius: theme.border.radius.sm,
              background: theme.colors.white,
              width: '100%',
              zIndex: 999,
            }}
          >
            {options.map((option) => (
              <span
                key={option.value}
                className={css({
                  display: 'block',
                  width: '100%',
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '10px 30px 10px 16px',
                  cursor: 'pointer',
                  ':hover': {
                    background: '#F3F9FC',
                  },
                })}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const iconStyles: Rule = {
  transition: 'transform 0.4s ease',
  cursor: 'pointer',
};

const iconExpandStyles: Rule = {
  transform: 'rotate(180deg)',
};

export default Select;
