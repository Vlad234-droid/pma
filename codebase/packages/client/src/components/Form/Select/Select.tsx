import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { Rule, useStyle } from '@dex-ddl/core';
import { Icon } from 'components/Icon';

import { useRefContainer } from '../context/input';
import { SelectField } from '../types';

const Select: FC<SelectField> = ({
  domRef,
  onChange,
  placeholder = '',
  value = undefined,
  options,
  disabled = false,
  name,
  getSelected,
}) => {
  const { css, theme } = useStyle();
  const refIcon = useRefContainer();
  const [currentValue, setCurrentValue] = useState(value);
  const [isOptionOpen, toggleOption] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'table',
          width: '100%',
        }}
      >
        <input
          role='select'
          ref={mergeRefs([domRef, refIcon])}
          name={name}
          value={currentValue}
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
          onSelect={(e) => {
            onChange(e);
            toggleOption(false);
          }}
          onClick={() => toggleOption(true)}
          onBlur={() => toggleOption(false)}
        />
        <span
          data-test-id={`${name || ''}Options`}
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
            {options.map((option, index) => {
              return (
                <span
                  data-test-id={`${name || ''}Options-${index}`}
                  key={option.value}
                  className={css({
                    display: 'block',
                    width: '100%',
                    fontSize: '16px',
                    lineHeight: '20px',
                    padding: '10px 30px 10px 16px',
                    ':hover': {
                      background: '#F3F9FC',
                    },
                  })}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setCurrentValue(option.value);
                    if (getSelected !== undefined) {
                      getSelected(option);
                    }
                  }}
                >
                  {option.label}
                </span>
              );
            })}
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
