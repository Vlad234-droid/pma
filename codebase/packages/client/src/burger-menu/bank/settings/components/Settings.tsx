import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Link } from 'react-router-dom';

import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { Icon } from 'components/Icon';

import { Page } from 'pages';

const List = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <>
      <div className={css(itemSettingsBorderStyle, { marginLeft: '20px' })} />
      <Link to={buildPath(Page.SETTINGS)} className={css(itemSettingsStyle)}>
        <Icon graphic={'settingsGear'} />
        <span className={css(itemSettingsTextStyle)}>{t('settings', 'Settings')}</span>
      </Link>
    </>
  );
};

export default List;

const itemSettingsTextStyle: Rule = ({ theme }) => {
  return {
    paddingLeft: '16px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
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
