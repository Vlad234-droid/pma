import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Rule, Styles, useBreakpoints, useStyle, CreateRule, theme } from '@dex-ddl/core';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Graphics, RoundIcon, Icon } from 'components/Icon';
import { AlertDrawer, AlertBadge, useMessagesContext } from 'features/Messages';

export type HeaderProps = {
  title: string;
  onBack?: () => void;
  styles?: Styles | Rule;
  customSize?: boolean;
  withIcon?: boolean;
  iconName?: Graphics;
};

export const TEST_ID = 'header';
export const BACK_BTN_TEST_ID = 'header-back';

const Header: FC<HeaderProps> = ({ title, onBack, withIcon, iconName = 'home', styles = {} }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname, state }: any = useLocation();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const { fetchMessagesCount } = useMessagesContext();

  const handleMenuOpen = () => {
    navigate(pathname, {
      state: {
        isMenuOpen: true,
      },
    });
  };

  const handleClose = () => {
    navigate(pathname, { replace: true });
  };

  const handleAlertClose = async () => {
    handleClose();
    fetchMessagesCount();
  };

  const handleAlertOpen = () => {
    navigate(pathname, {
      state: {
        isAlertOpen: true,
      },
    });
  };

  useEffect(() => {
    navigate(pathname, {
      state: {
        isMenuOpen: false,
        isAlertOpen: false,
      },
    });
  }, []);

  return (
    <div className={css(wrapperStyles, styles)} data-test-id={TEST_ID}>
      {onBack ? <IconButton onPress={onBack} graphic='backwardLink' data-test-id={BACK_BTN_TEST_ID} /> : <div />}
      <h3 className={css(headerStyles({ mobileScreen, onBack }))}>
        {withIcon && (
          <div className={css({ height: '24px', marginRight: '10px' })}>
            <Icon graphic={iconName} />
          </div>
        )}
        {title}
      </h3>
      <div className={css(itemsStyles({ mobileScreen }))}>
        <RoundIcon>
          <IconButton onPress={handleAlertOpen} graphic='alert' />
          <AlertBadge />
        </RoundIcon>
        <Icon onClick={handleMenuOpen} graphic='hamburger' iconStyles={iconStyles} />
      </div>
      {state?.isMenuOpen && <MenuDrawer onClose={handleClose} />}
      {state?.isAlertOpen && <AlertDrawer onClose={handleAlertClose} />}
    </div>
  );
};

const iconStyles: Rule = {
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
};

const itemsStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: mobileScreen ? '15px' : '30px',
  alignItems: 'center',
});

const wrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const headerStyles: CreateRule<{ mobileScreen; onBack }> = ({ mobileScreen, onBack }) => ({
  lineHeight: '1.2',
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.tescoBlue,
  marginRight: 'auto',
  ...(mobileScreen
    ? {
        marginLeft: '25px',
        paddingLeft: 0,
      }
    : {
        marginLeft: 'auto',
        paddingLeft: onBack ? '66px' : '91px',
      }),
});

export default Header;
