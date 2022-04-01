import React, { FC } from 'react';
import { useStyle, colors } from '@pma/dex-wrapper';
import { CheckboxField } from '../types';

const Checkbox: FC<CheckboxField> = ({ id, name, onChange, checked, disabled = false, indeterminate = false }) => {
  const { css } = useStyle();
  return (
    <span>
      <input
        disabled={disabled}
        className={css(
          {
            width: '20px',
            height: '20px',
            appearance: 'none',
            backgroundColor: colors.white,
            border: `1px solid ${colors.tescoBlue}`,
            padding: '9px',
            borderRadius: '0px',
            display: 'inline-block',
            position: 'relative',
            cursor: 'pointer',
            ...(indeterminate
              ? {
                  backgroundColor: colors.tescoBlue,
                  ':before': {
                    content: '"I"',
                    position: 'absolute',
                    display: 'inline-block',
                    color: colors.white,
                    fontSize: '18px',
                    lineHeight: '22px',
                    fontWeight: 'bold',
                    transform: 'rotate(90deg)',
                    bottom: '-2px',
                    right: '7px',
                  },
                }
              : checked && {
                  backgroundColor: colors.tescoBlue,
                  ':before': {
                    content: '"L"',
                    position: 'absolute',
                    display: 'inline-block',
                    bottom: '2px',
                    color: colors.white,
                    transform: 'rotate(45deg) scale(-1,1)',
                    left: '5px',
                    fontSize: '18px',
                    lineHeight: '22px',
                    fontWeight: 'bold',
                    height: '100%',
                  },
                }),
          },
          disabled
            ? {
                backgroundColor: colors.disabled,
                opacity: 0.2,
              }
            : {},
        )}
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
      />
    </span>
  );
};

export default Checkbox;
