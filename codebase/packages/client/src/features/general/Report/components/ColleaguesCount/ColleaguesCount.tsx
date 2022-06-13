import React, { FC, CSSProperties } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

export const TEST_ID = 'colleague-count';

export const ColleaguesCount: FC<{
  countStyles: Styles | Rule | CSSProperties | {};
  colleaguesCount: number | undefined;
}> = ({ countStyles = {}, colleaguesCount }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  return (
    <span className={css(countStyles)} data-test-id={TEST_ID}>
      {`${t('colleagues', 'Colleagues')}: `}
      <b>{colleaguesCount ?? 0}</b>
    </span>
  );
};
