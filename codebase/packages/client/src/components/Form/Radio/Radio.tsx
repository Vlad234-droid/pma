import React, { FC } from 'react';
import { useStyle, colors } from '@dex-ddl/core';

import { RadioProps } from '../types';
const Radio: FC<RadioProps> = ({ id, value, type = 'radio', name, onChange, checked }) => {
  const { css } = useStyle();
  return (
    <input
      className={css({
        width: '20px',
        height: '20px',
        appearance: 'none',
        backgroundColor: colors.white,
        border: `1px solid ${colors.tescoBlue}`,
        borderRadius: '10px',
        display: 'inline-block',
        position: 'relative',
        ':checked': {
          border: `7px solid ${colors.tescoBlue}`,
        },
      })}
      id={id}
      onChange={onChange}
      checked={checked}
      type={type}
      name={name}
      value={value}
    />
  );
};

export default Radio;
