import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Link } from 'react-router-dom';

import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';

const List = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <Link to={buildPath(Page.CREATE_STRATEGIC_DRIVERS)} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
      <Icon graphic={'bank'} />
      <span className={css(itemSettingsTextStyle)}>{t('strategic_drivers', 'Strategic drivers')}</span>
    </Link>
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
