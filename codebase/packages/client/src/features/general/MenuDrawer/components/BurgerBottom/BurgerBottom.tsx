import React, { useMemo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getBottomMenuData } from '@pma/store';
import { useSelector } from 'react-redux';

import ListItem from '../ListItem';

import { getSplittedKey } from '../../utils';

export const BurgerBottom = () => {
  const { css } = useStyle();

  const menu = useSelector(getBottomMenuData);

  const menuItems = useMemo(() => menu?.map(({ key }) => <ListItem key={key} name={getSplittedKey(key)} />), [menu]);

  return <div className={css(menuDrawerSettingsStyle)}>{menuItems}</div>;
};

const menuDrawerSettingsStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  height: '100%',

  '> *:first-child:before': {
    display: 'none',
  },
});
