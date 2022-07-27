import React, { useMemo, useState } from 'react';
import { Rule, CreateRule, useStyle } from '@pma/dex-wrapper';
import { getInnerMenuData } from '@pma/store';
import { useSelector } from 'react-redux';

import { Icon } from 'components/Icon';
import { Trans } from 'components/Translation';
import { getSplittedKey } from 'features/general/MenuDrawer/utils';
import { InnerList } from './InnerList';

export const DROPDOWN_BTN = 'DROPDOWN_BTN';
export const DROPDOWN_ITEMS_WRAPPER = 'DROPDOWN_ITEMS_WRAPPER';

const Administration = () => {
  const [isOpenDropdown, toggleOpen] = useState(false);

  const { css } = useStyle();
  const innerList = useSelector(getInnerMenuData);

  const handleToggleDropdown = () => {
    toggleOpen((isOpenDropdown) => !isOpenDropdown);
  };

  const innerListItems = useMemo(
    () => innerList?.map(({ key }) => <InnerList key={key} name={getSplittedKey(key)} />),
    [innerList],
  );

  return (
    <>
      <div
        data-test-id={DROPDOWN_BTN}
        className={css(itemSettingsStyle, adminToolsStyle)}
        onClick={handleToggleDropdown}
      >
        <Icon graphic={'tool'} />
        <span className={css(itemSettingsTextStyle)}>
          <Trans i18key={'administrator_tools'}>Administrator tools</Trans>
        </span>
        <Icon
          graphic={'arrowDown'}
          iconStyles={{
            marginLeft: '15px',
            transform: isOpenDropdown ? 'rotate(-0deg)' : 'rotate(-90deg)',
            transition: 'all .2s ease-in-out',
          }}
        />
      </div>
      <div className={css(menuDropdownStyle({ isOpen: isOpenDropdown }))} data-test-id={DROPDOWN_ITEMS_WRAPPER}>
        {innerListItems}
      </div>
    </>
  );
};

const menuDropdownStyle: CreateRule<{ isOpen: boolean }> =
  ({ isOpen }) =>
  ({ theme }) => ({
    height: isOpen ? 'auto' : 0,
    overflow: 'hidden',
    // @ts-ignore
    backgroundColor: theme.colors.lightBlue,
    transition: 'all .5s ease-in-out',
  });

const itemSettingsStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  margin: '0 0 0 20px',
};

const itemSettingsTextStyle: Rule = ({ theme }) => ({
  paddingLeft: '16px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const adminToolsStyle: Rule = {
  cursor: 'pointer',
  userSelect: 'none',
};

export default Administration;
