import React, { FC, memo } from 'react';

import { useStyle, Rule, CreateRule } from '@dex-ddl/core';

import { Icon, IconProps, Graphics } from './';

export type RoundIconProps = {
  graphic: Graphics;
  iconStyles?: Rule;
  iconProps?: Omit<IconProps, 'graphic' | 'iconStyles'>;
  strokeWidth?: number;
};

const ICON_WIDTH = 24;

export const RoundIcon: FC<RoundIconProps> = memo(({ graphic, iconStyles, iconProps, strokeWidth = 2 }) => {
  const { css } = useStyle();

  return (
    <span className={css(roundIconStyle({ strokeWidth }))}>
      <Icon graphic={graphic} iconStyles={iconStyles} {...iconProps} />
    </span>
  );
});

const roundIconStyle: CreateRule<{ strokeWidth: number }> =
  ({ strokeWidth }) =>
  ({ theme }) => ({
    display: 'flex',
    width: `${ICON_WIDTH + strokeWidth}px`,
    height: `${ICON_WIDTH + strokeWidth}px`,
    borderRadius: `${ICON_WIDTH + strokeWidth}px`,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  });
