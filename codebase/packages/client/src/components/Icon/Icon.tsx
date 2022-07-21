import React, { FC } from 'react';

import { CreateRule, Rule, Styles, useStyle, Colors } from '@pma/dex-wrapper';

import { getId, getTitle } from './utils';

import { icons, Graphics } from './';

export type IconBaseProps = {
  graphic: Graphics;
  title?: string;
  iconStyles?: Rule;
  invertColors?: boolean;
  color?: Colors;
  testId?: string;
  containerTestId?: string;
  onClick?: () => void;
};

export type IconStyleProps = {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  size?: Styles['width'];
  backgroundRadius?: number;
};

type ViewBoxType = {
  viewBox?: string;
};

export type IconProps = ViewBoxType & IconBaseProps & IconStyleProps;

export const Icon: FC<IconProps> = ({
  graphic,

  title,
  iconStyles = {},
  invertColors = false,
  color,
  testId,
  containerTestId,
  backgroundRadius,
  onClick,
  ...styles
}) => {
  const { css } = useStyle();

  const CustomIcon = icons[graphic];

  const titleId = getId(title ?? CustomIcon.name);
  const customTitle = title ?? getTitle(CustomIcon.name);

  return (
    <div onClick={onClick} className={css({ display: 'flex' })} data-test-id={containerTestId}>
      <svg
        data-test-id={testId}
        fill='none'
        className={css(customStylesRule(styles), iconStyles)}
        viewBox={'0 0 24 24'}
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        aria-labelledby={titleId}
      >
        <title id={titleId} data-test-id={titleId}>
          {customTitle}
        </title>
        {backgroundRadius && <circle cx={backgroundRadius} cy={backgroundRadius} r={backgroundRadius} fill='white' />}
        <CustomIcon invertColors={invertColors} color={color} />
      </svg>
    </div>
  );
};

const customStylesRule: CreateRule<IconStyleProps> =
  ({ fill, size, stroke, strokeWidth }) =>
  () => ({
    width: size ?? '24px',
    height: size ?? '24px',

    '& path': {
      strokeWidth,
      stroke,
      fill,
    },
  });
