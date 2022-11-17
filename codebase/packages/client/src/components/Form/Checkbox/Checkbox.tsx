import React, { FC } from 'react';
import { useStyle, CreateRule, Rule } from '@pma/dex-wrapper';

const Checkbox: FC<any> = ({ id, name, onChange, checked, disabled = false, indeterminate = false, ...rest }) => {
  const { css } = useStyle();
  return (
    <div data-test-id={`checkbox-${name}`}>
      <input
        disabled={disabled}
        className={css(inputStyle({ indeterminate, checked }), disabled ? inputDisabledStyle : {})}
        id={id}
        name={name}
        data-test-id={name}
        type='checkbox'
        onChange={onChange}
        checked={checked}
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
        {...rest}
      />
    </div>
  );
};

const inputStyle: CreateRule<{ indeterminate: boolean; checked?: boolean }> =
  ({ indeterminate, checked }) =>
  ({ theme }) => ({
    width: '20px',
    height: '20px',
    appearance: 'none',
    backgroundColor: theme.colors.white,
    border: `2px solid ${theme.colors.tescoBlue}`,
    padding: '9px',
    borderRadius: '0px',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    ...(indeterminate && checked
      ? {
          backgroundColor: theme.colors.tescoBlue,
          ':before': {
            content: '"I"',
            position: 'absolute',
            display: 'inline-block',
            color: theme.colors.white,
            fontSize: theme.font.fixed.f18.fontSize,
            lineHeight: theme.font.fixed.f18.lineHeight,
            letterSpacing: '0px',
            fontWeight: theme.font.weight.bold,
            transform: 'rotate(90deg)',
            bottom: '-2px',
            right: '7px',
          },
        }
      : checked && {
          backgroundColor: theme.colors.tescoBlue,
          ':before': {
            content: '"L"',
            position: 'absolute',
            display: 'inline-block',
            bottom: '2px',
            color: theme.colors.white,
            transform: 'rotate(45deg) scale(-1,1)',
            left: '5px',
            fontSize: theme.font.fixed.f18.fontSize,
            lineHeight: theme.font.fixed.f18.lineHeight,
            letterSpacing: '0px',
            fontWeight: theme.font.weight.bold,
            height: '100%',
          },
        }),
  });

const inputDisabledStyle: Rule = ({ theme }) => ({
  backgroundColor: theme.colors.disabled,
  opacity: 0.2,
});

export default Checkbox;
