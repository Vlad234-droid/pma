import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

export const Text: FC<{ value: string }> = ({ value }) => {
  const { css } = useStyle();

  return <div className={css(containerStyle)}>{value}</div>;
};

const containerStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  color: theme.colors.base,
  paddingBottom: '8px',
});
