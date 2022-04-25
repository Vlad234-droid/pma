import React from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

const NotificationTile = ({ children }) => {
  const { css } = useStyle();
  return <div className={css(notificationBlockStyle)}>{children}</div>;
};

const notificationBlockStyle: Rule = ({ theme }) => {
  return {
    marginTop: theme.spacing.s4,
    padding: `${theme.spacing.s4} ${theme.spacing.s12} ${theme.spacing.s4} ${theme.spacing.s4}`,
    //@ts-ignore
    background: theme.colors.lightBlue,
    borderRadius: theme.spacing.s2_5,
    '& > p': {
      fontSize: theme.font.fixed.f14.fontSize,
      lineHeight: theme.font.fixed.f14.lineHeight,
      letterSpacing: '0px',
      margin: theme.spacing.s0,
    },
  } as Styles;
};

export default NotificationTile;
