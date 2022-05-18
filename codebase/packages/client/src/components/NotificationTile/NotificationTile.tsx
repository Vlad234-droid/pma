import React, { FC, CSSProperties } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

const NotificationTile: FC<{ styles?: Rule | Styles | CSSProperties | {} }> = ({ children, styles = {} }) => {
  const { css } = useStyle();
  return <div className={css(notificationBlockStyle, styles)}>{children}</div>;
};

const notificationBlockStyle: Rule = ({ theme }) => {
  return {
    marginTop: theme.spacing.s4,
    padding: `${theme.spacing.s4} ${theme.spacing.s12} ${theme.spacing.s4} ${theme.spacing.s4}`,
    //@ts-ignore
    background: theme.colors.lightBlue,
    borderRadius: theme.spacing.s2_5,
    '& > p': {
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: theme.font.fixed.f16.lineHeight,
      letterSpacing: '0px',
      margin: theme.spacing.s0,
    },
  } as Styles;
};

export default NotificationTile;
