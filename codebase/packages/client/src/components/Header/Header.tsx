import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Rule, Styles, useStyle } from '@dex-ddl/core';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';

export type HeaderProps = {
  title: string;
  onBack?: () => void;
  styles?: Styles | Rule;
  customSize?: boolean;
};

export const TEST_ID = 'header';
export const BACK_BTN_TEST_ID = 'header-back';

const Header: FC<HeaderProps> = ({ title, onBack, styles = {} }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname, state }: any = useLocation();

  const handleOpen = () => {
    navigate(pathname, {
      state: {
        isOpen: true,
      },
    });
  };

  const handleClose = () => {
    navigate(pathname, { replace: true });
  };

  return (
    <div className={css(wrapperStyles, styles)} data-test-id={TEST_ID}>
      {onBack ? <IconButton onPress={onBack} graphic='backwardLink' data-test-id={BACK_BTN_TEST_ID} /> : <div />}
      <h3 className={css(headerStyles)}>{title}</h3>
      <IconButton onPress={handleOpen} graphic='hamburger' />
      {state?.isOpen && <MenuDrawer onClose={handleClose} />}
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0px 40px',
};

const headerStyles: Rule = ({ theme }) => ({
  lineHeight: '1.2',
  fontSize: '24px',
  color: theme.colors.tescoBlue,
});
export default Header;
