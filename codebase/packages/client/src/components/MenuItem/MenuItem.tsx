import React, { FC } from 'react';
import { TileWrapper } from 'components/Tile';
import { Icon, IconProps } from 'components/Icon';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Link } from 'react-router-dom';

export type Props = {
  iconGraphic: IconProps['graphic'];
  linkTo?: string;
  title: string;
};

export const MenuItem: FC<Props> = ({ iconGraphic, title, linkTo = '' }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      <Link to={linkTo} replace>
        <TileWrapper title={title} hover={true} customStyle={wrapperStyles}>
          <Icon graphic={iconGraphic} iconStyles={iconStyles} />
          <div className={css(styledTitle)}>{title}</div>
        </TileWrapper>
      </Link>
    </div>
  );
};

const wrapperStyle: Rule = {
  flex: '1 0 30%',
  minHeight: '100px',
};

export const styledTitle: Rule = ({ theme }) => {
  return {
    paddingTop: '3px',
    fontSize: theme.font.fixed.f12.fontSize,
    lineHeight: theme.font.fixed.f12.lineHeight,
    letterSpacing: '0px',
  };
};

export const wrapperStyles: Rule = {
  height: '100%',
  padding: '18px 8px 8px',
  fontSize: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

export const iconStyles: Rule = {
  minWidth: '20px',
  minHeight: '20px',
};
