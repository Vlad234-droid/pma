import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';

export const Text: FC<{ value: string }> = ({ value }) => {
  const { css, theme } = useStyle();

  return (
    <div
      className={css({
        fontSize: '14px',
        lineHeight: '18px',
        color: theme.colors.base,
      })}
    >
      {value}
    </div>
  );
};
