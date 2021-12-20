import React, { FC } from 'react';
import { MenuItem } from 'components/MenuItem';
import { Rule, useStyle } from '@dex-ddl/core';
import { Link } from 'react-router-dom';
import { Page } from 'pages';
import { LINKS } from 'config/constants';
import TescoLogo from './TescoLogo.svg';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

export type MenuDrawerProps = { onClose: () => void };

export const MenuDrawer: FC<MenuDrawerProps> = ({ onClose }) => {
  const { css } = useStyle();
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
            <MenuItem iconGraphic={'calender'} linkTo={Page.MY_VIEW} title={'My View'} />
            <MenuItem iconGraphic={'document'} linkTo={Page.OBJECTIVES_VIEW} title={'My Objectives'} />
            <MenuItem
              iconGraphic={'document'}
              linkTo={Page.CREATE_ORGANIZATION_OBJECTIVES}
              title={'Strategic Priorities'}
            />
            <MenuItem iconGraphic={'add'} title={'Personal Development Plan'} />
            <MenuItem iconGraphic={'account'} linkTo={Page.PROFILE} title={'My Profile'} />
            <MenuItem iconGraphic={'chatSq'} linkTo={Page.FEEDBACK} title={'Feedback'} />
            <MenuItem iconGraphic={'edit'} linkTo='' title={'My Notes'} />
            <MenuItem iconGraphic={'alert'} linkTo={Page.PERFORMANCE_CYCLE} title={'Performance Cycle'} />
          </div>
        </div>
        <div className={css(menuDrawerSettingsStyle)}>
          <Link to={''} className={css(itemSettingsStyle)}>
            <Icon graphic={'settingsGear'} />
            <span className={css(itemSettingsTextStyle)}>Settings</span>
          </Link>
          <Link to={''} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
            <Icon graphic={'question'} />
            <span className={css(itemSettingsTextStyle)}>Help and FAQ</span>
          </Link>
          <a href={LINKS.signOut} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
            <Icon graphic={'signOut'} />
            <span className={css(itemSettingsTextStyle)}>Sign out</span>
          </a>
        </div>
      </div>
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
