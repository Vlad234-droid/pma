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
    <Link to={buildPath(Page.PERFORMANCE_CYCLE)} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
      <Icon graphic={'createCycle'} />
      <span className={css(itemSettingsTextStyle)}>{t('create_performance_cycle', 'Create performance cycle')}</span>
    </Link>
  );
};

const itemSettingsStyle: Rule = ({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0 12px 20px',
  ':hover': {
    // @ts-ignore
    background: theme.colors.lightBlue,
    opacity: 0.9,
  },
});

const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  position: 'relative',
  marginTop: '2px',
  ':before': {
    position: 'absolute',
    width: '100%',
    content: "''",
    left: 20,
    top: '-2px',
    height: '2px',
    // @ts-ignore
    backgroundColor: theme.colors.lightGray,
  },
});

const itemSettingsTextStyle: Rule = ({ theme }) => ({
  paddingLeft: '16px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

export default List;
