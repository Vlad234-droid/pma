import React, { FC, CSSProperties } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

export const TEST_ID = 'colleague-count';

export const ColleaguesCount: FC<{
  countStyles: Styles | Rule | CSSProperties | {};
  count: number | undefined;
  visible?: boolean;
}> = ({ countStyles = {}, count, visible = true }) => {
  const { t } = useTranslation();
  const { css } = useStyle();

  if (!visible) return null;
  return (
    <span className={css(countStyles)} data-test-id={TEST_ID}>
      {`${t('colleagues', 'Colleagues')}: `}
      <b>{count ?? 0}</b>
    </span>
  );
};
