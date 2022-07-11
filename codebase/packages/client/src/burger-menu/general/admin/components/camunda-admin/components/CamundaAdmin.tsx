import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';

import { CAMUNDA_APP_PATH, PUBLIC_URL } from 'config/constants';

const List = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <a
      href={`${PUBLIC_URL}${CAMUNDA_APP_PATH}`}
      target={'_blank'}
      rel='noreferrer'
      className={css(itemSettingsStyle, itemSettingsBorderStyle)}
    >
      <Icon graphic={'document'} />
      <span className={css(itemSettingsTextStyle)}>{t('camunda_admin', 'Camunda Admin')}</span>
    </a>
  );
};

const itemSettingsStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  margin: '0 0 0 20px',
};
const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
});

const itemSettingsTextStyle: Rule = ({ theme }) => ({
  paddingLeft: '16px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

export default List;
