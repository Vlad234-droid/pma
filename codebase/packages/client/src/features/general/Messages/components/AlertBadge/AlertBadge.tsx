import React, { FC } from 'react';

import { useStyle, CreateRule } from '@pma/dex-wrapper';
import { useMessagesContext } from '../../context/messagesContext';

type AlertBadgeProps = {};

const AlertBadge: FC<AlertBadgeProps> = () => {
  const { css } = useStyle();

  const { count } = useMessagesContext();

  return <>{count > 0 && <div className={css(alertRule({ count }))}>{count > 999 ? '999+' : count}</div>}</>;
};

const alertRule: CreateRule<{ count: number }> =
  ({ count }) =>
  ({ colors, font, zIndex, spacing }) => ({
    ...font.fixed.f12,
    position: 'absolute',
    minWidth: '20px',
    padding: count > 99 ? `${spacing.s0_5} ${spacing.s1_5}` : spacing.s0_5,
    top: '-8px',
    left: '50%',
    backgroundColor: colors.tescoRedSecondary,
    fontWeight: font.weight.bold,
    zIndex: zIndex.i0,
    display: 'grid',
    placeItems: 'center',
    borderRadius: '100vmax',
    whiteSpace: 'nowrap',
    color: colors.white,
  });

export default AlertBadge;
