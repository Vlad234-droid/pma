import React, { useCallback, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getInnerMenuData } from '@pma/store';
import { useSelector } from 'react-redux';

import { InnerList } from './InnerList';
import { Icon } from 'components/Icon';
import { getSplittedKey } from 'features/general/MenuDrawer/utils';

export const DROPDOWN_BTN = 'DROPDOWN_BTN';
export const DROPDOWN_ITEMS_WRAPPER = 'DROPDOWN_ITEMS_WRAPPER';

const Administration = () => {
  const [isOpenDropdown, toggleOpen] = useState(false);

  const { css } = useStyle();
  const innerList = useSelector(getInnerMenuData);

  const handleToggleDropdown = () => {
    toggleOpen((isOpenDropdown) => !isOpenDropdown);
  };

  const getInnerList = useCallback(
    () => innerList.map(({ key }) => <InnerList key={key} name={getSplittedKey(key)} />),
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
        <span className={css(itemSettingsTextStyle)}>Administrator tools</span>

        <Icon
          graphic={'arrowDown'}
          iconStyles={{
            marginLeft: '15px',
            transform: isOpenDropdown ? 'rotate(-0deg)' : 'rotate(-90deg)',
            transition: 'all .2s ease-in-out',
          }}
        />
      </div>
      {isOpenDropdown && (
        <div className={css(menuDropdownStyle)} data-test-id={DROPDOWN_ITEMS_WRAPPER}>
          {getInnerList()}
        </div>
      )}
    </>
  );
};

const menuDropdownStyle: Rule = ({ theme }) => ({
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
