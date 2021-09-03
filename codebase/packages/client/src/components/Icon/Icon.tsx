import React, { FC } from 'react';

import { useStyle, CreateRule, Rule } from 'styles';

import { icons, Graphics } from './graphics';
import { getId, getTitle } from './utils';

export type IconBaseProps = {
  graphic: Graphics;
  title?: string;
  iconStyles?: Rule;
  invertColors?: boolean;
  testId?: string;
};

export type IconStyleProps = {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  size?: string;
};

export type IconProps = IconBaseProps & IconStyleProps;

export const Icon: FC<IconProps> = ({ graphic, title, iconStyles = {}, invertColors = false, testId, ...styles }) => {
  const { css } = useStyle();

  const CustomIcon = icons[graphic];

  const titleId = getId(title ?? CustomIcon.name);
  const customTitle = title ? title : getTitle(CustomIcon.name);

  return (
    <>
      <svg
        data-testid={testId}
        fill='none'
        className={css(customStylesRule(styles), iconStyles)}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        aria-labelledby={titleId}
      >
        <title id={titleId}>{customTitle}</title>

        <CustomIcon invertColors={invertColors} />
      </svg>
    </>
  );
};

const customStylesRule: CreateRule<IconStyleProps> = (styles) => ({
  width: styles?.size ?? '24px',
  height: styles?.size ?? '24px',

  '& path': {
    strokeWidth: styles?.strokeWidth,
    stroke: styles?.stroke,
    fill: styles?.fill,
  },
});
