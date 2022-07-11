import React, { FC, MouseEvent, useRef } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { BurgerTop } from './components/BurgerTop';
import { BurgerBottom } from './components/BurgerBottom';
import { Trans } from 'components/Translation';
import { Icon } from 'components/Icon';

import TescoLogo from 'assets/img/TescoLogo.svg';

export type MenuDrawerProps = { onClose: () => void };

export const MENU_DRAWER_WRAPPER = 'menu-drawer-wrapper';

const MenuDrawer: FC<MenuDrawerProps> = ({ onClose }) => {
  const { css } = useStyle();

  const underlayRef = useRef(null);

  const underlayClick = (e: MouseEvent<HTMLDivElement>) => e.target === underlayRef.current && onClose();

  return (
    <div
      className={css(menuDrawerWrapperStyle)}
      onClick={underlayClick}
      ref={underlayRef}
      data-test-id={MENU_DRAWER_WRAPPER}
    >
      <div className={css(menuDrawerContentStyle)}>
        <div className={css(menuDrawerTopStyle)}>
          <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
            <img className={css({ maxWidth: 'inherit' })} src={TescoLogo} alt='TescoLogo' />
            <div className={css(iconWrapperStyles)}>
              <Icon onClick={onClose} graphic='cancel' iconStyles={iconStyles} />
            </div>
          </div>
          <div className={css(menuDrawerTitleStyle)}>
            <Trans i18nkey={'your_contribution_title'}>Your Contribution</Trans>
          </div>
          <BurgerTop />
        </div>
        <BurgerBottom />
      </div>
    </div>
  );
};

const iconWrapperStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
};

const iconStyles: Rule = {
  width: '24px',
  height: '24px',
  cursor: 'pointer',
};

const menuDrawerWrapperStyle: Rule = ({ colors, zIndex }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: colors.link30,
  zIndex: zIndex.i50,
});

const menuDrawerContentStyle: Rule = ({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  minWidth: '360px',
  background: theme.colors.backgroundDark,
  minHeight: '100vh',
});

const menuDrawerTopStyle: Rule = {
  padding: '24px',
};

const menuDrawerTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  padding: '8px 0 24px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

export default MenuDrawer;
