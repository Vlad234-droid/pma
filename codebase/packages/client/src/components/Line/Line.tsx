import React, { FC, CSSProperties } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

export const Line: FC<{ styles?: Rule | Styles | CSSProperties | {}; testId?: string }> = ({
  styles = {},
  testId = '',
}) => {
  const { css } = useStyle();
  return <div className={css(defaultStyles, styles)} data-test-id={testId} />;
};

const defaultStyles: Rule = ({ theme }) => ({
  height: '1px',
  //@ts-ignore
  background: theme.colors.lightGray,
});
