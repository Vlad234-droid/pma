import React, { useMemo } from 'react';
import { getTopMenuData } from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';

import MenuItem from '../MenuItem';
import { getSplittedKey } from '../../utils';

export const BurgerTop = () => {
  const menu = useSelector(getTopMenuData);

  const { css } = useStyle();

  const menuItems = useMemo(() => menu?.map(({ key }) => <MenuItem key={key} name={getSplittedKey(key)} />), [menu]);

  return <div className={css(menuDrawerButtonsStyle)}>{menuItems}</div>;
};

const menuDrawerButtonsStyle: Rule = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(98px, 1fr))',
  gap: '8px',
};
