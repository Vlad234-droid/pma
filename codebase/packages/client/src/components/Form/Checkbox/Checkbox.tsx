import React, { FC } from 'react';
import { useStyle, colors } from '@dex-ddl/core';

import { CheckboxProps } from '../types';
const Checkbox: FC<CheckboxProps> = ({ id, type, name, onChange, checked, indeterminate = false }) => {
  const { css } = useStyle();
  return (
    <span>
      <input
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
            ':checked': {
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
            },
          },
          indeterminate
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