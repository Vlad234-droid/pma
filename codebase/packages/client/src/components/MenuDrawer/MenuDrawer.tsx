import React, { FC, useState } from 'react';
import { MenuItem } from 'components/MenuItem';
import { Rule, useStyle } from '@dex-ddl/core';
import { Link } from 'react-router-dom';
import { Page } from 'pages';
import { LINKS } from 'config/constants';
import TescoLogo from './TescoLogo.svg';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { buildPath } from 'features/Routes';
import { ConfirmModal } from 'features/Modal';
import { useTranslation } from 'components/Translation';

export type MenuDrawerProps = { onClose: () => void };

export const MenuDrawer: FC<MenuDrawerProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { css } = useStyle();
  const { t } = useTranslation();

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleSignOutConfirm = () => {
    window.location.href = LINKS.signOut;
    setIsOpen(false);
  };

  return (
    <div className={css(menuDrawerWrapperStyle)}>
      <div className={css(menuDrawerContentStyle)}>
        <div className={css(menuDrawerTopStyle)}>
          <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
            <img className={css({ maxWidth: 'inherit' })} src={TescoLogo} alt='TescoLogo' />
            <IconButton graphic={'cancel'} onPress={onClose} />
          </div>
          <div className={css(menuDrawerTitleStyle)}>Performance management application</div>
          <div className={css(menuDrawerButtonsStyle)}>
            <MenuItem iconGraphic={'calender'} linkTo={buildPath(Page.CONTRIBUTION)} title={'Your Contribution'} />
            <MenuItem
              iconGraphic={'document'}
              linkTo={buildPath(Page.OBJECTIVES_VIEW)}
              title={t('my_objectives_and_reviews', 'My objectives and reviews')}
            />
            <MenuItem
              iconGraphic={'document'}
              linkTo={buildPath(Page.CREATE_STRATEGIC_DRIVERS)}
              title={'Strategic drivers'}
            />
            <MenuItem iconGraphic={'add'} title={'Personal Development plan'} />
            <MenuItem iconGraphic={'account'} linkTo={buildPath(Page.PROFILE)} title={'My profile'} />
            <MenuItem iconGraphic={'chatSq'} linkTo={buildPath(Page.FEEDBACK)} title={'Feedback'} />
            <MenuItem iconGraphic={'edit'} linkTo='' title={'My notes'} />
            <MenuItem iconGraphic={'alert'} linkTo={buildPath(Page.PERFORMANCE_CYCLE)} title={'Performance cycle'} />
          </div>
        </div>
        <div className={css(menuDrawerSettingsStyle)}>
          <Link to={buildPath(Page.TIPS)} className={css(itemSettingsStyle)}>
            {/* TODO: change tips' icon */}
            <Icon graphic={'support'} />
            <span className={css(itemSettingsTextStyle)}>Tips</span>
          </Link>
          <Link to={''} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
            <Icon graphic={'settingsGear'} />
            <span className={css(itemSettingsTextStyle)}>Settings</span>
          </Link>
          <Link to={''} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
            <Icon graphic={'question'} />
            <span className={css(itemSettingsTextStyle)}>{`Help and FAQ's`}</span>
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
          submitBtnTitle={t('confirm', 'Confirm')}
          onSave={handleSignOutConfirm}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

const menuDrawerWrapperStyle = {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0, 83, 159, 0.7)',
  zIndex: 2,
} as Rule;

const menuDrawerContentStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  maxWidth: '360px',
  background: '#F6F6F6',
  height: '100%',
} as Rule;

const menuDrawerTopStyle = {
  padding: '24px',
} as Rule;

const menuDrawerTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  padding: '8px 0 24px',
});

const menuDrawerButtonsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
} as Rule;

const menuDrawerSettingsStyle = {
  background: '#FFFFFF',
  height: '100%',
  padding: '6px 0 0 18px',
} as Rule;

const itemSettingsTextStyle = {
  paddingLeft: '16px',
} as Rule;

const itemSettingsStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
} as Rule;

const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
});
