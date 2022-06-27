import React, { FC, MouseEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, timelinesExistSelector } from '@pma/store';

import { Page } from 'pages';
import { LINKS } from 'config/constants';
import { buildPath } from 'features/general/Routes';
import { ConfirmModal } from 'features/general/Modal';
import { CanPerform, role } from 'features/general/Permission';
import { Trans, useTranslation } from 'components/Translation';
import { useHeaderContainer } from 'contexts/headerContext';
import { MenuItem } from 'components/MenuItem';
import TescoLogo from 'assets/img/TescoLogo.svg';
import { Icon } from 'components/Icon';
import { MenuDropdown } from './components/MenuDropdown';

export type MenuDrawerProps = { onClose: () => void };

export const MENU_DRAWER_WRAPPER = 'menu-drawer-wrapper';

const MenuDrawer: FC<MenuDrawerProps> = ({ onClose }) => {
  const { linkTitle } = useHeaderContainer();
  const [isOpen, setIsOpen] = useState(false);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));

  const { css } = useStyle();
  const { t } = useTranslation();

  const underlayRef = useRef(null);

  const underlayClick = (e: MouseEvent<HTMLDivElement>) => e.target === underlayRef.current && onClose();

  const handleSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleSignOutConfirm = () => {
    window.location.href = LINKS.signOut;
    setIsOpen(false);
  };

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
          <div className={css(menuDrawerTitleStyle)}>Your Contribution</div>
          <div className={css(menuDrawerButtonsStyle)}>
            <MenuItem
              iconGraphic={'home'}
              linkTo={buildPath(Page.CONTRIBUTION)}
              title={t('your_contribution', 'Your contribution')}
            />
            {timelinesExist && (
              <MenuItem
                iconGraphic={'goal'}
                linkTo={buildPath(Page.OBJECTIVES_VIEW)}
                title={
                  linkTitle?.[Page.OBJECTIVES_VIEW]
                    ? linkTitle[Page.OBJECTIVES_VIEW]
                    : t('my_objectives_and_reviews', 'My objectives and reviews')
                }
              />
            )}
            <CanPerform
              perform={[role.LINE_MANAGER, role.PEOPLE_TEAM, role.COLLEAGUE]}
              yes={() => (
                <MenuItem
                  iconGraphic={'list'}
                  linkTo={buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)}
                  title={t('personal_development_plan', 'Personal Development Plan')}
                />
              )}
            />
            <MenuItem iconGraphic={'edit'} linkTo={buildPath(Page.NOTES)} title={t('my_notes', 'My notes')} />
            <MenuItem iconGraphic={'account'} linkTo={buildPath(Page.PROFILE)} title={t('my_profile', 'My profile')} />
            <MenuItem iconGraphic={'chat'} linkTo={buildPath(Page.FEEDBACKS)} title={t('feedback', 'Feedback')} />
            <CanPerform
              perform={[role.TALENT_ADMIN, role.ADMIN, role.EXECUTIVE, role.LINE_MANAGER]}
              yes={() => (
                <MenuItem
                  iconGraphic={'team'}
                  linkTo={buildPath(Page.REPORT)}
                  title={t('team_reporting', 'Team reporting')}
                />
              )}
            />
          </div>
        </div>
        <div className={css(menuDrawerSettingsStyle)}>
          <CanPerform perform={[role.TALENT_ADMIN, role.ADMIN, role.PROCESS_MANAGER]} yes={() => <MenuDropdown />} />

          <div className={css(itemSettingsBorderStyle, { marginLeft: '20px' })} />
          <Link to={buildPath(Page.SETTINGS)} className={css(itemSettingsStyle)}>
            <Icon graphic={'settingsGear'} />
            <span className={css(itemSettingsTextStyle)}>{t('settings', 'Settings')}</span>
          </Link>
          <Link to={buildPath(Page.KNOWLEDGE_LIBRARY)} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
            <Icon graphic={'question'} />
            <span className={css(itemSettingsTextStyle)}>{t('faqs', 'Help and FAQs')}</span>
          </Link>
          <a href={LINKS.signOut} className={css(itemSettingsStyle, itemSettingsBorderStyle)} onClick={handleSignOut}>
            <Icon graphic={'signOut'} />
            <span className={css(itemSettingsTextStyle)}>{t('sign_out', 'Sign out')}</span>
          </a>
        </div>
      </div>
      {isOpen && (
        <ConfirmModal
          title={''}
          description={t('are_you_sure_you_want_to_log_out', 'Are you sure you want to log out?')}
          submitBtnTitle={<Trans i18nKey='confirm'>Confirm</Trans>}
          onSave={handleSignOutConfirm}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
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

const menuDrawerButtonsStyle: Rule = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(98px, 1fr))',
  gap: '8px',
};

const menuDrawerSettingsStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  height: '100%',
  padding: '6px 0 0 0',
});

const itemSettingsTextStyle: Rule = ({ theme }) => {
  return {
    paddingLeft: '16px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const itemSettingsStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  margin: '0 0 0 20px',
};

const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
});

export default MenuDrawer;
