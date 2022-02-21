import React, { FC, MouseEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@dex-ddl/core';
import { Page } from 'pages';
import { LINKS } from 'config/constants';
import { buildPath } from 'features/Routes';
import { ConfirmModal } from 'features/Modal';
import { CanPerform, role } from 'features/Permission';
import { Trans, useTranslation } from 'components/Translation';
import { MenuItem } from 'components/MenuItem';
import TescoLogo from 'assets/img/TescoLogo.svg';
import { Icon } from '../Icon';

export type MenuDrawerProps = { onClose: () => void };

export const MenuDrawer: FC<MenuDrawerProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, toggleOpen] = useState(false);

  const { css } = useStyle();
  const { t } = useTranslation();

  const handleToggleDropdown = () => {
    toggleOpen((isOpen) => !isOpen);
  };

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
    <div className={css(menuDrawerWrapperStyle)} onClick={underlayClick} ref={underlayRef}>
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
            <MenuItem
              iconGraphic={'aim'}
              linkTo={buildPath(Page.OBJECTIVES_VIEW)}
              title={t('my_objectives_and_reviews', 'My objectives and reviews')}
            />
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
            <MenuItem iconGraphic={'chatSq'} linkTo={buildPath(Page.FEEDBACK)} title={t('feedback', 'Feedback')} />
            <CanPerform
              perform={[role.TALENT_ADMIN, role.ADMIN]}
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
          <CanPerform
            perform={[role.TALENT_ADMIN, role.ADMIN]}
            yes={() => {
              return (
                <>
                  <div className={css(itemSettingsStyle, adminToolsStyle)} onClick={handleToggleDropdown}>
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
                    <div className={css(menuDropdownStyle)}>
                      <CanPerform
                        perform={[role.ADMIN]}
                        yes={() => (
                          <>
                            <Link
                              to={buildPath(Page.PERFORMANCE_CYCLE)}
                              className={css(itemSettingsStyle, itemSettingsBorderStyle)}
                            >
                              <Icon graphic={'createCycle'} />
                              <span className={css(itemSettingsTextStyle)}>
                                {t('create_performance_cycle', 'Create performance cycle')}
                              </span>
                            </Link>
                            <Link
                              to={buildPath(Page.ADMINISTRATION)}
                              className={css(itemSettingsStyle, itemSettingsBorderStyle)}
                            >
                              <Icon graphic={'configuration'} />
                              <span className={css(itemSettingsTextStyle)}>
                                {t('configurations', 'Configurations')}
                              </span>
                            </Link>
                          </>
                        )}
                      />
                      <Link
                        to={buildPath(Page.CREATE_STRATEGIC_DRIVERS)}
                        className={css(itemSettingsStyle, itemSettingsBorderStyle)}
                      >
                        <Icon graphic={'strategicDriver'} />
                        <span className={css(itemSettingsTextStyle)}>
                          {t('strategic_drivers', 'Strategic drivers')}
                        </span>
                      </Link>
                      <CanPerform
                        perform={[role.ADMIN]}
                        yes={() => (
                          <Link to={buildPath(Page.TIPS)} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
                            <Icon graphic={'tip'} />
                            <span className={css(itemSettingsTextStyle)}>{t('tips', 'Tips')}</span>
                          </Link>
                        )}
                      />
                    </div>
                  )}
                </>
              );
            }}
          />
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
  maxWidth: '360px',
  background: theme.colors.backgroundDark,
  minHeight: '100vh',
});

const menuDrawerTopStyle: Rule = {
  padding: '24px',
};

const menuDrawerTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  padding: '8px 0 24px',
});

const menuDrawerButtonsStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const menuDrawerSettingsStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  height: '100%',
  padding: '6px 0 0 0',
});

const itemSettingsTextStyle: Rule = {
  paddingLeft: '16px',
};

const itemSettingsStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  margin: '0 0 0 20px',
};

const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
});

const menuDropdownStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  backgroundColor: theme.colors.lightBlue,
  transition: 'all .5s ease-in-out',
});

const adminToolsStyle: Rule = {
  cursor: 'pointer',
  userSelect: 'none',
};
