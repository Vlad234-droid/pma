import React, { FC } from 'react';
import { useStyle } from 'styles';

import { TextareaProps } from '../types';
import { useRefContainer } from '../context/input';

const Input: FC<TextareaProps> = ({ placeholder = '', rows = 3 }) => {
  const { css } = useStyle();
  const ref = useRefContainer();

  return (
    <textarea
      ref={ref}
      className={css({
        width: '100%',
        border: '1px solid #E5E5E5',
        borderRadius: '5px',
        fontSize: '16px',
        lineHeight: '20px',
        padding: '10px 30px 10px 16px',
        ':focus': {
          outline: 'none !important',
          border: '1px solid #00539F',
        },
      })}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

export default Input;
