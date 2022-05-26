import React, { FC } from 'react';
import { useStyle, colors } from '@pma/dex-wrapper';
import { RadioField } from '../types';

const Radio: FC<RadioField> = ({ id, name, onChange, readonly, checked, value }) => {
  const { css } = useStyle();
  return (
    <input
      className={css({
        width: '20px',
        height: '20px',
        appearance: 'none',
        backgroundColor: colors.white,
        border: `2px solid ${colors.tescoBlue}`,
        borderRadius: '10px',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        ':checked': {
          border: `7px solid ${colors.tescoBlue}`,
        },
      })}
      id={id}
      onChange={onChange}
      checked={checked}
      type={'radio'}
      name={name}
      readOnly={readonly}
      data-test-id={name}
      value={value}
    />
  );
};

export default Radio;
