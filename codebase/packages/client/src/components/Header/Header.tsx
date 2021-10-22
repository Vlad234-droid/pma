import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Rule, Styles, useStyle } from '@dex-ddl/core';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';

export type HeaderProps = {
  title: string;
  onBack?: () => void;
  styles?: Styles | Rule;
};

export const TEST_ID = 'header';
export const BACK_BTN_TEST_ID = 'header-back';

const Header: FC<HeaderProps> = ({ title, onBack, styles = {} }) => {
  const { css } = useStyle();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      history.goBack();
    }
  };

  return (
    <div className={css(wrapperStyles, styles)} data-test-id={TEST_ID}>
      <IconButton onPress={handleBack} graphic='backwardLink' data-test-id={BACK_BTN_TEST_ID} />
      <h3 className={css(headerStyles)}>{title}</h3>
      <IconButton onPress={() => setShowMenu(true)} graphic='hamburger' />
      {showMenu && <MenuDrawer onClose={() => setShowMenu(false)} />}
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const headerStyles: Rule = ({ theme }) => ({
  lineHeight: '24px',
  fontSize: '20px',
  color: theme.colors.tescoBlue,
});

const sideMenuStyles: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Header;
