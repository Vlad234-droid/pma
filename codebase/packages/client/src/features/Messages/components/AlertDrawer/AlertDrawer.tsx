import React, { FC, useRef, useState, MouseEvent, useEffect } from 'react';

import { Rule, useStyle, CreateRule, IconButton } from '@dex-ddl/core';
import { MyInbox } from '@my-inbox/client';
import { useTranslation } from 'components/Translation';
import { CONFIG } from 'config/constants';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@pma/store';
import { DEFAULT_SENDER_NAME } from '../../config';

export type AlertDrawerProps = { onClose: () => void };

type Spacing = '100%' | 0;

export const AlertDrawer: FC<AlertDrawerProps> = ({ onClose }) => {
  const [width, setWidth] = useState<Spacing>(0);
  const { css, matchMedia } = useStyle();
  const isDesktop = matchMedia({ largeAbove: true }) ?? false;

  const { info } = useSelector(currentUserSelector);
  const isManager = (info && info.isManager) ?? false;

  const { t } = useTranslation();

  const underlayRef = useRef(null);

  const underlayClick = (e: MouseEvent<HTMLDivElement>) => e.target === underlayRef.current && onClosePress();

  const onTransitionEnd = () => {
    if (isDesktop && width === 0) {
      return onClose();
    }
  };

  const onClosePress = () => {
    setWidth(0);
    if (!isDesktop) {
      return setTimeout(() => onClose(), 0);
    }
  };

  useEffect(() => {
    setTimeout(() => setWidth('100%'), 0);
  }, []);

  const { signOut, applicationName, mountPath } = CONFIG;

  return (
    <div className={css(slideInModalRule)}>
      {isDesktop && <div className={css(underlayRule)} onClick={underlayClick} ref={underlayRef} />}
      <div className={css(containerRule({ isDesktop, width }))} onTransitionEnd={onTransitionEnd}>
        <div className={css(headerRule, pointerRule)}>
          <div className={css(titleRule)}>{t('my_alerts', 'My Alerts')}</div>
          <div className={css(iconRule)}>
            <IconButton graphic='close' onPress={onClosePress} iconProps={{ size: '14px' }} />
          </div>
        </div>
        <div className={css(parcelRule, pointerRule)}>
          <MyInbox
            appName={applicationName}
            envConfig={{ env: mountPath as any, mountPath, logoutPath: signOut }}
            isManager={isManager}
            senders={[DEFAULT_SENDER_NAME]}
          />
        </div>
      </div>
    </div>
  );
};

const slideInModalRule: Rule = ({ zIndex }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  width: '100%',
  zIndex: zIndex.i40,
  height: '100%',
});

const titleRule: Rule = {
  width: '100%',
};

const underlayRule: Rule = ({ colors }) => ({
  width: '100%',
  height: '100%',
  background: colors.link30,
  cursor: 'pointer',
});

const containerRule: CreateRule<Record<'width', Spacing> & { isDesktop: boolean }> =
  ({ width, isDesktop }) =>
  ({ zIndex }) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width,
    display: 'flex',
    flexDirection: 'column',
    transition: 'width .4s ease-in-out',
    ...(isDesktop && {
      width: width === '100%' ? '50%' : 0,
    }),
    cursor: 'pointer',
    height: '100%',
    zIndex: zIndex.i50,
  });

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

const parcelRule: Rule = ({ colors }) => ({
  background: colors.backgroundDark,
  flexGrow: 1,
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
