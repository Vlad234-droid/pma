import React, { FC, useState } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { Icon } from 'components/Icon';

import { SelectProps } from '../types';

const Select: FC<SelectProps> = ({ placeholder = '', value = undefined, options, disabled = false, name }) => {
  const { css, theme } = useStyle();
  const [selectedOptionValue, setSelectedOptionValue] = useState(value);
  const [isOptionOpen, toggleOption] = useState(false);
  const selectedOptionLabel = options.find(({ value }) => value === selectedOptionValue)?.label || '';

  return (
    <>
      <div
        style={{
          display: 'table',
          width: '100%',
        }}
      >
        <input
          name={name}
          disabled={disabled}
          className={css({
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
          })}
          placeholder={`- ${placeholder} -`}
          value={selectedOptionLabel}
          readOnly={true}
          onClick={() => toggleOption(true)}
          onBlur={(e) => toggleOption(false)}
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
          />
        </span>
        {isOptionOpen && options.length && (
          <div
            style={{
              display: 'block',
              position: 'relative',
              border: `1px solid ${theme.colors.backgroundDarkest}`,
              borderRadius: theme.border.radius.sm,
            }}
          >
            {options.map((option) => {
              return (
                <span
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
                  onClick={(e) => {
                    setSelectedOptionValue(option.value);
                    toggleOption(false);
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
};

const iconExpandStyles: Rule = {
  transform: 'rotate(180deg)',
};

export default Select;
