import React, { FC, CSSProperties } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';

export const TEST_ID = 'colleague-count';

export const ColleaguesCount: FC<{
  countStyles: Styles | Rule | CSSProperties | {};
  count: number | undefined;
  visible?: boolean;
  title?: string;
}> = ({ countStyles = {}, count, visible = true, title = '' }) => {
  const { css } = useStyle();

  if (!visible) return null;
  return (
    <span className={css(countStyles)} data-test-id={TEST_ID}>
      {title}
      <b>{count ?? 0}</b>
    </span>
  );
};
