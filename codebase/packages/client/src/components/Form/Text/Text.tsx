import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';

export const Text: FC<{ value: string }> = ({ value }) => {
  const { css, theme } = useStyle();

  return (
    <div
      className={css({
        fontSize: '16px',
        lineHeight: '20px',
        color: theme.colors.base,
        paddingBottom: '8px',
      })}
    >
      {value}
    </div>
  );
};
