import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';

export const Text: FC<{ value: string }> = ({ value }) => {
  const { css } = useStyle();

  return (
    <div
      className={css({
        fontSize: '14px',
        lineHeight: '18px',
      })}
    >
      {value}
    </div>
  );
};
