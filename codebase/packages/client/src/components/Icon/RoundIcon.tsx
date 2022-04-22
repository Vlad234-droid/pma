import React, { FC, memo } from 'react';
import { useStyle, CreateRule, colors } from '@pma/dex-wrapper';

export type RoundIconProps = {
  strokeWidth?: number;
  strokeColor?: string;
};

const ICON_WIDTH = 24;

export const RoundIcon: FC<RoundIconProps> = memo(({ strokeWidth = 12, strokeColor = colors.tescoBlue, children }) => {
  const { css } = useStyle();

  return <div className={css(roundIconStyle({ strokeWidth, strokeColor }))}>{children}</div>;
});

const roundIconStyle: CreateRule<Required<RoundIconProps>> =
  ({ strokeWidth, strokeColor }) =>
  () => ({
    position: 'relative',
    display: 'inline-flex',
    width: `${ICON_WIDTH + strokeWidth}px`,
    height: `${ICON_WIDTH + strokeWidth}px`,
    borderRadius: `${ICON_WIDTH + strokeWidth}px`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: strokeColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  });
