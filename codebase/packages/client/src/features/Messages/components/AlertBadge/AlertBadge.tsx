import React, { FC } from 'react';

import { Rule, useStyle } from '@dex-ddl/core';
import { useMessagesContext } from '../../context/messagesContext';

type AlertBadgeProps = {};

const AlertBadge: FC<AlertBadgeProps> = () => {
  const { css } = useStyle();

  const { count } = useMessagesContext();

  return <>{count > 0 && <div className={css(alertRule)}>{count}</div>}</>;
};

const alertRule: Rule = ({ colors, font, zIndex }) => ({
  ...font.fixed.f12,
  position: 'absolute',
  height: '16px',
  top: '-8px',
  left: '50%',
  backgroundColor: colors.tescoRedSecondary,
  fontWeight: font.weight.bold,
  zIndex: zIndex.i0,
  padding: '0 5px',
  borderRadius: '10px',
});

export default AlertBadge;
