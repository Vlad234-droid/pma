import React, { FC } from 'react';
import { TileWrapper } from 'components/Tile';
import { Icon, IconProps } from 'components/Icon';
import { Rule } from '@dex-ddl/core';
import { Link } from 'react-router-dom';

export type Props = {
  iconGraphic: IconProps['graphic'];
  linkTo?: string;
  title: string;
};

export const MenuItem: FC<Props> = ({ iconGraphic, title, linkTo = '' }) => (
  <div>
    <Link to={linkTo} replace>
      <TileWrapper title={title} hover={true} customStyle={wrapperStyles}>
        <Icon graphic={iconGraphic} iconStyles={iconStyles} />
        <div style={{ paddingTop: '8px' }}>{title}</div>
      </TileWrapper>
    </Link>
  </div>
);

const wrapperStyles: Rule = {
  width: '98px',
  height: '94px',
  padding: '18px 8px 16px',
  fontSize: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const iconStyles: Rule = {
  minWidth: '20px',
  minHeight: '20px',
};
