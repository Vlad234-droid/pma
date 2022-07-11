import React, { useCallback } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getBottomMenuData } from '@pma/store';
import { useSelector } from 'react-redux';

import Spinner from 'components/Spinner';
import ListItem from '../ListItem';

import { getSplittedKey } from '../../utils';

export const BurgerBottom = () => {
  const { css } = useStyle();

  const menu = useSelector(getBottomMenuData);

  const getList = useCallback(() => menu?.map(({ key }) => <ListItem key={key} name={getSplittedKey(key)} />), [menu]);

  if (!menu.length) return <Spinner />;

  return <div className={css(menuDrawerSettingsStyle)}>{getList()}</div>;
};

const menuDrawerSettingsStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  height: '100%',
  padding: '6px 0 0 0',
});
