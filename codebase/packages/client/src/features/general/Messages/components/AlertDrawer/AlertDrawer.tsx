import React, { FC } from 'react';

import { Rule, useStyle, IconButton } from '@pma/dex-wrapper';
import { MyInbox } from '@my-inbox/client';
import { useTranslation } from 'components/Translation';
import { CONFIG } from 'config/constants';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@pma/store';
import { DEFAULT_SENDER_NAME } from '../../config';

export type AlertDrawerProps = { onClose: () => void };

export const ALERT_DRAWER_WRAPPER = 'alert-drawer-wrapper';
export const ALERT_DRAWER_CLOSE_BTN = 'alert-drawer-close-btn';

export const AlertDrawer: FC<AlertDrawerProps> = ({ onClose }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { info } = useSelector(currentUserSelector);
  const isManager = (info && info.isManager) ?? false;

  const { signOut, applicationName, mountPath } = CONFIG;

  return (
    <>
      <div className={css(headerRule, pointerRule)}>
        <div className={css(titleRule)}>{t('my_alerts', 'My Alerts')}</div>
        <div className={css(iconRule)} data-test-id={ALERT_DRAWER_CLOSE_BTN}>
          <IconButton graphic='close' onPress={onClose} iconProps={{ size: '14px' }} />
        </div>
      </div>
      <div className={css(parcelRule, pointerRule)} data-test-id={ALERT_DRAWER_WRAPPER}>
        <MyInbox
          appName={applicationName}
          envConfig={{ env: mountPath as any, mountPath, logoutPath: signOut }}
          isManager={isManager}
          senders={[DEFAULT_SENDER_NAME]}
        />
      </div>
    </>
  );
};

const titleRule: Rule = ({ theme }) => {
  return {
    width: '100%',
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
  };
};

const headerRule: Rule = ({ colors, font }) => ({
  background: colors.backgroundDark,
  paddingTop: '20px',
  paddingLeft: '20px',
  ...font.fixed.f20,
  fontWeight: font.weight.bold,
  color: colors.link,
  position: 'sticky',
  top: 0,
});

const iconRule: Rule = {
  position: 'absolute',
  top: '20px',
  right: '20px',
};

const pointerRule: Rule = { cursor: 'default' };

const parcelRule: Rule = ({ colors, theme }) => ({
  background: colors.backgroundDark,
  flexGrow: 1,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  '& > div': {
    height: '100%',
  },
  '& > div div[role="button"] > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)': {
    opacity: 0,
  },
  '& > div div[role="rowgroup"] > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)':
    {
      opacity: 0,
    },
});

export default AlertDrawer;
