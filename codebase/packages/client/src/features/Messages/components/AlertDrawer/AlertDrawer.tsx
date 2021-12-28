import React, { FC, useRef, useState, MouseEvent, useEffect } from 'react';

import { Rule, useStyle, CreateRule, IconButton } from '@dex-ddl/core';
import { MyInbox } from '@my-inbox/client';
import { useTranslation } from 'components/Translation';
import { CONFIG } from 'config/constants';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@pma/store';

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
          />
        </div>
      </div>
    </div>
  );
};

const slideInModalRule: Rule = ({ zIndex }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
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
    position: 'absolute',
    top: 0,
    right: 0,
    width,
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
  marginTop: '6px',
  height: 'calc(100% - 50px)',
  '& > div': {
    height: '100%',
  },
});

export default AlertDrawer;
