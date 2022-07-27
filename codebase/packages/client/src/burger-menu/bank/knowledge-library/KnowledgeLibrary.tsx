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
    <Link to={buildPath(Page.KNOWLEDGE_LIBRARY)} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
      <Icon graphic={'question'} />
      <span className={css(itemSettingsTextStyle)}>{t('faqs', 'Help and FAQs')}</span>
    </Link>
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

const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
});

const itemSettingsStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  margin: '0 0 0 20px',
};
