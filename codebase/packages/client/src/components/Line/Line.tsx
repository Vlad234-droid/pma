import React, { FC, CSSProperties } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

export const Line: FC<{ styles?: Rule | Styles | CSSProperties | {} }> = ({ styles = {} }) => {
  const { css } = useStyle();
  return <div className={css(defaultStyles, styles)} />;
};

const defaultStyles: Rule = ({ theme }) => ({
  height: '1px',
  //@ts-ignore
  background: theme.colors.lightGray,
});
