import React, { FC } from 'react';
import { TileWrapper } from 'components/Tile';
import { Icon, IconProps } from 'components/Icon';
import { Rule, useStyle } from '@dex-ddl/core';
import { Link } from 'react-router-dom';

export type Props = {
  iconGraphic: IconProps['graphic'];
  linkTo?: string;
  title: string;
};

export const MenuItem: FC<Props> = ({ iconGraphic, title, linkTo = '' }) => {
  const { css } = useStyle();
  return (
    <div>
      <Link to={linkTo}>
        <TileWrapper title={title} customStyle={wrapperStyles}>
          <Icon graphic={iconGraphic} iconStyles={iconStyles} />
          <div>{title}</div>
        </TileWrapper>
      </Link>
    </div>
  );
};

const wrapperStyles = {
  width: '98px',
  height: '94px',
  padding: '18px 8px 16px',
  fontSize: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
} as Rule;

const iconStyles = {
  width: '24px',
  height: '24px',
  margin: '8px',
} as Rule;
