import React, { FC, InputHTMLAttributes, CSSProperties } from 'react';
import { useStyle, CreateRule, Rule } from '@pma/dex-wrapper';

type Props = {
  onChange: (checked: boolean) => void;
  label?: string;
  labelStyle?: CSSProperties;
  errorMessage?: string;
  indeterminate?: boolean;
};
const Checkbox: FC<Omit<InputHTMLAttributes<'checkbox'>, 'onChange'> & Props> = ({
  id,
  name,
  onChange,
  checked,
  disabled = false,
  label,
  labelStyle = {},
  errorMessage,
  indeterminate = false,
}) => {
  const { css } = useStyle();
  const hasError = Boolean(errorMessage);

  return (
    <div>
      <label data-test-id={`checkbox-${name}`} className={css(wrapperStyle)}>
        <input
          disabled={disabled}
          className={css(inputStyle({ indeterminate, checked, hasError }), disabled ? inputDisabledStyle : {})}
          id={id}
          name={name}
          data-test-id={name}
          type='checkbox'
          onChange={({ target }) => onChange && onChange(target.checked)}
          checked={checked}
          ref={(input) => {
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
        />
        <span className={css(innerLabelStyle({ hasError }), labelStyle as Rule)}>{label}</span>
      </label>
      {errorMessage && <p className={css(errorMessageStyle)}>{errorMessage}</p>}
    </div>
  );
};

const inputStyle: CreateRule<{ indeterminate: boolean; hasError: boolean; checked?: boolean }> =
  ({ indeterminate, checked, hasError }) =>
  ({ theme }) => ({
    width: '22px',
    height: '22px',
    appearance: 'none',
    backgroundColor: theme.colors.white,
    border: `1px solid ${hasError ? theme.colors.error : theme.colors.grayscale}`,
    padding: '9px',
    borderRadius: '0px',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginRight: '1em',
    ...theme.font.fixed.f16,

    ':focus': {
      outline: `3px solid ${hasError ? theme.colors.tescoRed30 : theme.colors.tescoBlue30}`,
      borderColor: hasError ? theme.colors.error : theme.colors.tescoBlue,
    },
    ':hover': {
      outline: `3px solid ${hasError ? theme.colors.tescoRed30 : theme.colors.tescoBlue30}`,
      borderColor: hasError ? theme.colors.error : theme.colors.tescoBlue,
    },

    ...(indeterminate && {
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
        right: '8px',
      },
    }),
    ...(checked && {
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

const wrapperStyle: Rule = {
  display: 'flex',
  alignItems: 'top',
};

const inputDisabledStyle: Rule = ({ theme }) => ({
  backgroundColor: theme.colors.disabled,
  opacity: 0.2,
});

const innerLabelStyle: CreateRule<{ hasError: boolean }> =
  ({ hasError }) =>
  ({ theme }) => ({
    paddingTop: '2px',
    ...(hasError && {
      ':after': {
        content: '"*"',
        color: theme.colors.error,
      },
    }),
  });

const errorMessageStyle: Rule = ({ theme }) => ({
  color: theme.colors.error,
  paddingTop: '24px',
  ...theme.font.fixed.f16,

  ':before': {
    content: '"*"',
    color: theme.colors.error,
  },
});

export default Checkbox;
