import React, { FC } from 'react';
import { useHistory, useLocation, Route } from 'react-router-dom';
import { IconButton, Rule, Styles, useStyle } from '@dex-ddl/core';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';

export type HeaderProps = {
  title: string;
  onBack: () => void;
  styles?: Styles | Rule;
  customSize?: boolean;
};

export const TEST_ID = 'header';
export const BACK_BTN_TEST_ID = 'header-back';

const Header: FC<HeaderProps> = ({ title, onBack, styles = {} }) => {
  const { css } = useStyle();
  const history = useHistory();
  const { pathname } = useLocation();

  const handleOpen = () => {
    history.replace({
      pathname,
      state: {
        isOpen: true,
      },
    });
  };

  const handleClose = () => {
    history.replace(pathname);
  };

  return (
    <div className={css(wrapperStyles, styles)} data-test-id={TEST_ID}>
      <IconButton onPress={onBack} graphic='backwardLink' data-test-id={BACK_BTN_TEST_ID} />
      <h3 className={css(headerStyles)}>{title}</h3>
      <IconButton onPress={handleOpen} graphic='hamburger' />
      <Route>{({ location: { state = {} } }) => (state as any).isOpen && <MenuDrawer onClose={handleClose} />}</Route>
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const headerStyles: Rule = ({ theme }) => ({
  lineHeight: '1.2',
  fontSize: '24px',
  color: theme.colors.tescoBlue,
});
export default Header;
